/**
 * Centralized requirements checking and result processing
 */
export default class RequirementsEngine {
    
    constructor(scene) {
        this.scene = scene;
        this.checkers = this.initializeCheckers();
        this.handlers = this.initializeHandlers();
    }

    /**
     * Check if all requirements for an interaction are met
     */
    checkRequirements(requirements, context = {}) {
        // If no requirements, consider them satisfied
        if (!requirements || requirements.length === 0) {
            return {
                met: 0,
                required: 0,
                satisfied: true,
                failures: [],
                refunds: []
            };
        }

        const results = {
            met: 0,
            required: requirements.length,
            satisfied: false,
            failures: [],
            refunds: []
        };

        requirements.forEach(requirement => {
            const checker = this.checkers[requirement.type];
            if (!checker) {
                console.warn(`No checker for requirement type: ${requirement.type}`);
                return;
            }

            const checkResult = checker.call(this, requirement, context);
            
            if (checkResult.met) {
                results.met++;
                if (checkResult.refund) {
                    results.refunds.push(checkResult.refund);
                }
            } else {
                results.failures.push({
                    requirement,
                    reason: checkResult.reason
                });
            }
        });

        results.satisfied = results.met === results.required;
        return results;
    }

    /**
     * Apply results after successful requirement check
     */
    applyResults(requirements, interaction, context = {}) {
        if (!requirements || requirements.length === 0) {
            return [];
        }

        const results = [];

        requirements.forEach(requirement => {
            // Consume money for MONEY type requirements
            if (requirement.type === 'MONEY') {
                const consumed = this.consumeMoney(requirement, context);
                console.log(`Money consumed: ${consumed}`);
                if (!consumed) {
                    console.warn('Failed to consume money');
                }
            }

            if (!requirement.result || requirement.result === 'UNTOUCHED') {
                return;
            }

            console.log(`Applying result: ${requirement.result} for type: ${requirement.type}`);
            
            const handler = this.handlers[requirement.result];
            if (!handler) {
                console.warn(`No handler for result type: ${requirement.result}`);
                return;
            }

            const result = handler.call(this, requirement, interaction, context);
            console.log(`Result applied:`, result);
            results.push(result);
        });

        return results;
    }

    /**
     * Refund any resources (money, items) on failure
     */
    refund(refunds) {
        if (!refunds || refunds.length === 0) return;
        
        refunds.forEach(refund => {
            if (refund.type === 'MONEY') {
                this.scene.player.coinpurse.addCoin(refund.amount);
            }
            // Add more refund types as needed
        });
    }

    // ===== REQUIREMENT CHECKERS =====

    initializeCheckers() {
        return {
            'ITEM': this.checkItem,
            'ITEM_KIND': this.checkItemKind,
            'OBJ_TYPE': this.checkObjectType,
            'OBJ_KIND': this.checkObjectKind,
            'MONEY': this.checkMoney,
            'DATA': this.checkData,
            'STATE': this.checkState
        };
    }

    checkItem(requirement, context) {
        const slotCheckers = {
            'IN_HAND': () => this.scene.manager.hud.pocket.findInPockets(requirement.ITEM),
            'ON_ACTIVE': () => this.scene.manager.objectManager.findOnActiveTile(requirement.ITEM, 'slug'),
            'IN_HAND_OR_ACTIVE': () => {
                return this.scene.manager.hud.pocket.findInPockets(requirement.ITEM) ||
                       this.scene.manager.objectManager.findOnActiveTile(requirement.ITEM, 'slug');
            },
            'IN_HAND_OR_BAG': () => this.scene.manager.hud.pocket.findInPockets(requirement.ITEM)
        };

        const checker = slotCheckers[requirement.slot_type];
        const found = checker ? checker() : false;

        return {
            met: found !== false,
            reason: found === false ? `${requirement.ITEM} not found` : null
        };
    }

    checkItemKind(requirement, context) {
        const slotCheckers = {
            'IN_HAND': () => this.scene.manager.hud.pocket.findItemKindInPockets(requirement.ITEM_KIND),
            'ON_ACTIVE': () => this.scene.manager.objectManager.findOnActiveTile(requirement.ITEM_KIND, 'type'),
            'IN_HAND_OR_ACTIVE': () => {
                return this.scene.manager.hud.pocket.findItemKindInPockets(requirement.ITEM_KIND) ||
                       this.scene.manager.objectManager.findOnActiveTile(requirement.ITEM_KIND, 'type');
            },
            'IN_HAND_OR_BAG': () => this.scene.manager.hud.pocket.findItemKindInPockets(requirement.ITEM_KIND)
        };

        const checker = slotCheckers[requirement.slot_type];
        const found = checker ? checker() : false;

        return {
            met: found !== false,
            reason: found === false ? `${requirement.ITEM_KIND} type not found` : null
        };
    }

    checkObjectType(requirement, context) {
        if (requirement.slot_type !== 'ON_ACTIVE') {
            return { met: false, reason: 'Invalid slot type for OBJ_TYPE' };
        }

        const found = (context.activeObject?.info.type === requirement.OBJ_TYPE) ||
                      this.scene.manager.objectManager.findOnActiveTile(requirement.OBJ_TYPE, 'type');

        return {
            met: !!found,
            reason: !found ? `${requirement.OBJ_TYPE} not on active tile` : null
        };
    }

    checkObjectKind(requirement, context) {
        if (requirement.slot_type !== 'ON_ACTIVE') {
            return { met: false, reason: 'Invalid slot type for OBJ_KIND' };
        }

        const found = (context.activeObject?.info.slug === requirement.OBJ_KIND) ||
                      this.scene.manager.objectManager.findOnActiveTile(requirement.OBJ_KIND, 'kind');

        return {
            met: !!found,
            reason: !found ? `${requirement.OBJ_KIND} not on active tile` : null
        };
    }

    checkMoney(requirement, context) {
        const hasCoins = this.scene.player.coinpurse.availableCoins([requirement.MONEY]);
        
        if (!hasCoins) {
            const formatted = (requirement.MONEY / 100).toFixed(2);
            this.scene.manager.hud.hudThinking.tellBrain(`I don't have $${formatted}.`);
        }

        return {
            met: hasCoins,
            reason: !hasCoins ? `Insufficient funds: $${(requirement.MONEY / 100).toFixed(2)}` : null
        };
    }

    consumeMoney(requirement, context) {
        const result = this.scene.player.coinpurse.insertCoins([requirement.MONEY]);
        return result;
    }

    checkData(requirement, context) {
        // Stub for checking game data state
        return { met: true };
    }

    checkState(requirement, context) {
        // Check object/player/game state
        return { met: true };
    }

    // ===== RESULT HANDLERS =====

    initializeHandlers() {
        return {
            'CONSUMED': this.handleConsumed,
            'CONSUME': this.handleConsumed,
            'TRANSFORMED': this.handleTransformed,
            'DUPLICATED': this.handleDuplicated,
            'MAILED': this.handleMailed,
            'FILLED': this.handleFilled,
            'DEPLETED': this.handleDepleted
        };
    }

    handleConsumed(requirement, interaction, context) {
        if (requirement.type === 'ITEM') {
            const removed = this.scene.manager.hud.pocket.removeItemFromPockets(
                requirement.ITEM,
                1
            );
            return { type: 'CONSUMED', item: requirement.ITEM, removed };
        }
        else if (requirement.type === 'ITEM_KIND') {
            // For ITEM_KIND, we need to find which specific item in pockets matches
            const pocketIndex = this.scene.manager.hud.pocket.findItemKindInPockets(requirement.ITEM_KIND);
            if (pocketIndex !== false) {
                const pocket = this.scene.manager.hud.pocket.getPocket(pocketIndex);
                const item = pocket[pocket.STATE];
                const itemSlug = item.info.slug;
                
                const removed = this.scene.manager.hud.pocket.removeItemFromPockets(itemSlug, 1);
                return { type: 'CONSUMED', item: itemSlug, removed };
            }
        }
        return { type: 'CONSUMED', success: false };
    }

    handleTransformed(requirement, interaction, context) {
        const targetItem = requirement[requirement.type];
        const requirementIndex = this.scene.manager.hud.pocket.findInPockets(targetItem);
        
        if (requirementIndex === false) {
            return { type: 'TRANSFORMED', success: false };
        }

        // Preserve bag contents if applicable
        const contents = this.scene.manager.hud.pocket.getItemsInBag(requirementIndex);
        
        this.scene.manager.hud.pocket.setPocket(requirementIndex, 'EMPTY');
        this.scene.manager.itemManager.newItemToPocket(
            requirementIndex,
            interaction.req_result_item
        );

        if (contents.length > 0) {
            this.scene.manager.hud.pocket.setItemsInBag(requirementIndex, contents);
        }

        return {
            type: 'TRANSFORMED',
            from: targetItem,
            to: interaction.req_result_item,
            success: true
        };
    }

    handleDuplicated(requirement, interaction, context) {
        const pocketIndex = context.pocketIndex;
        if (pocketIndex === undefined) {
            return { type: 'DUPLICATED', success: false };
        }

        const pocket = this.scene.manager.hud.pocket.getPocket(pocketIndex);
        if (pocket.STATE !== 'EMPTY') {
            pocket.HOLDS.updateStackCount(1);
            return { type: 'DUPLICATED', success: true };
        }
        return { type: 'DUPLICATED', success: false };
    }

    handleMailed(requirement, interaction, context) {
        return this.handleConsumed(requirement, interaction, context);
    }

    handleFilled(requirement, interaction, context) {
        const pocketIndex = context.pocketIndex;
        
        // If FILLED is used on an ON_ACTIVE requirement (like a trash can),
        // it doesn't need pocket context - it's just marking the object as affected
        if (requirement.slot_type === 'ON_ACTIVE') {
            return {
                type: 'FILLED',
                target: 'object',
                success: true
            };
        }
        
        // For pocket-based FILLED operations
        if (pocketIndex === undefined) {
            console.warn('handleFilled called without pocketIndex for non-object requirement');
            return { type: 'FILLED', success: false };
        }

        this.scene.manager.itemManager.newContentToPocket(
            pocketIndex,
            interaction.req_result_item
        );

        return {
            type: 'FILLED',
            with: interaction.req_result_item,
            success: true
        };
    }

    handleDepleted(requirement, interaction, context) {
        // Handle resource depletion
        return { type: 'DEPLETED', success: true };
    }
}

export default class ChunkDebugUI {
  constructor(options = {}){
    this.chunkManager = options.chunkManager || null;
    this.worldSystem = options.worldSystem || null;
    this.scene = options.scene || null;
    this.container = null;
    this.visible = false;
    this._build();
  }

  _build(){
    if (typeof document === 'undefined') return;
    const css = `
      #dev-chunk-ui { position: fixed; right: 10px; top: 10px; width: 360px; max-height: 70vh; overflow: auto; background: rgba(0,0,0,0.85); color: #eee; font-family: monospace; font-size:12px; border:1px solid #444; z-index:99999; padding:8px; }
      #dev-chunk-ui h4 { margin: 0 0 6px 0; font-size:13px }
      #dev-chunk-ui button { margin-right:6px; font-size:11px }
      #dev-chunk-ui .chunk-row { padding:4px 6px; border-bottom:1px solid rgba(255,255,255,0.03); display:flex; align-items:center; justify-content:space-between }
      #dev-chunk-ui .chunk-meta { color: #9ad; font-size:11px }
      #dev-chunk-ui textarea { width:100%; height:160px; margin-top:8px; background:#111; color:#ddd }
    `;
    const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

    const container = document.createElement('div'); container.id = 'dev-chunk-ui'; container.style.display = 'none';
    const title = document.createElement('h4'); title.textContent = 'Dev: Chunks';
    container.appendChild(title);

    const controls = document.createElement('div');
    const refresh = document.createElement('button'); refresh.textContent = 'Refresh';
    refresh.onclick = () => this.refresh();
    const exportAll = document.createElement('button'); exportAll.textContent = 'Export All';
    exportAll.onclick = async () => {
      if (!this.worldSystem) return alert('no WorldSystem');
      exportAll.disabled = true;
      try {
        const res = await this.worldSystem.forceExportAllChunks();
        console.log('forceExportAllChunks', res);
        alert(`exported ${res.exported} failed ${res.failed}`);
      } catch (e) { console.error(e); alert(String(e)); }
      exportAll.disabled = false;
    };
    const toggle = document.createElement('button'); toggle.textContent = 'Show'; toggle.onclick = () => this.toggle();
    controls.appendChild(refresh); controls.appendChild(exportAll); controls.appendChild(toggle);
    container.appendChild(controls);

    const status = document.createElement('div'); status.id = 'dev-chunk-status'; status.style.marginBottom = '6px'; container.appendChild(status);
    const list = document.createElement('div'); list.id = 'dev-chunk-list'; container.appendChild(list);
    const details = document.createElement('textarea'); details.id = 'dev-chunk-details'; container.appendChild(details);

    document.body.appendChild(container);
    this.container = container; this.list = list; this.details = details; this.status = status; this.toggleBtn = toggle; this.refresh();
  }

  show(){ if(!this.container) return; this.container.style.display = ''; this.visible = true; }
  hide(){ if(!this.container) return; this.container.style.display = 'none'; this.visible = false; }
  toggle(){ this.visible ? this.hide() : this.show(); }

  refresh(){
    if (!this.list) return;
    this.list.innerHTML = '';
    const chunks = (this.chunkManager && typeof this.chunkManager.getAllChunks === 'function') ? this.chunkManager.getAllChunks() : [];
    // Status: player chunk, loaded counts
    try {
      const totalChunks = chunks.length;
      const totalEntities = (this.worldSystem && this.worldSystem.entityManager && this.worldSystem.entityManager.entities) ? this.worldSystem.entityManager.entities.size : 0;
      let playerChunk = 'N/A';
      let entitiesInPlayerChunk = 'N/A';
      let itemsInPlayerChunk = 'N/A';
      let objectsInPlayerChunk = 'N/A';
      let plantsInPlayerChunk = 'N/A';
      let treesInPlayerChunk = 'N/A';
      if (this.scene && this.scene.player && this.scene.player.standingTile) {
        const tx = this.scene.player.standingTile.x;
        const ty = this.scene.player.standingTile.y;
        const cx = this.chunkManager ? this.chunkManager.worldTileToChunk(tx) : Math.floor(tx/32);
        const cy = this.chunkManager ? this.chunkManager.worldTileToChunk(ty) : Math.floor(ty/32);
        playerChunk = `${cx}_${cy}`;
        if (this.worldSystem && this.worldSystem.entityManager) {
          try { entitiesInPlayerChunk = this.worldSystem.entityManager.getEntitiesInChunk(cx, cy).length; } catch (e) { entitiesInPlayerChunk = 'err'; }
        } else {
          entitiesInPlayerChunk = 'N/A';
        }
        try {
          const chunk = (this.chunkManager && typeof this.chunkManager.getChunk === 'function') ? this.chunkManager.getChunk(cx, cy) : null;
          if (chunk) {
            try { itemsInPlayerChunk = (typeof chunk.getItems === 'function') ? chunk.getItems().length : chunk.getEntitiesByKind ? chunk.getEntitiesByKind('item').length : 0; } catch (e) { itemsInPlayerChunk = 'err'; }
            try { objectsInPlayerChunk = (typeof chunk.getEntitiesByKind === 'function') ? chunk.getEntitiesByKind('object').length : 0; } catch (e) { objectsInPlayerChunk = 'err'; }
            try { plantsInPlayerChunk = (typeof chunk.getPlants === 'function') ? chunk.getPlants().length : chunk.getEntitiesByKind ? chunk.getEntitiesByKind('plant').length : 0; } catch (e) { plantsInPlayerChunk = 'err'; }
            try { treesInPlayerChunk = (typeof chunk.getTrees === 'function') ? chunk.getTrees().length : chunk.getEntitiesByKind ? chunk.getEntitiesByKind('tree').length : 0; } catch (e) { treesInPlayerChunk = 'err'; }
          }
        } catch (e) {}
      }
      this.status.innerHTML = `<strong>PlayerChunk:</strong> ${playerChunk} &nbsp; <strong>Chunks:</strong> ${totalChunks} &nbsp; <strong>Entities:</strong> ${totalEntities} &nbsp; <strong>EntitiesInPlayerChunk:</strong> ${entitiesInPlayerChunk} <br/> <strong>Items:</strong> ${itemsInPlayerChunk} &nbsp; <strong>Objects:</strong> ${objectsInPlayerChunk} &nbsp; <strong>Plants:</strong> ${plantsInPlayerChunk} &nbsp; <strong>Trees:</strong> ${treesInPlayerChunk}`;
    } catch (e) { /* ignore */ }
    for (const c of chunks) {
      const row = document.createElement('div'); row.className = 'chunk-row';
      let itemsCount = 0, objectsCount = 0, plantsCount = 0, treesCount = 0;
      try { itemsCount = (typeof c.getItems === 'function') ? c.getItems().length : (c.getEntitiesByKind ? c.getEntitiesByKind('item').length : 0); } catch (e) { itemsCount = 'err'; }
      try { objectsCount = (typeof c.getEntitiesByKind === 'function') ? c.getEntitiesByKind('object').length : 0; } catch (e) { objectsCount = 'err'; }
      try { plantsCount = (typeof c.getPlants === 'function') ? c.getPlants().length : (c.getEntitiesByKind ? c.getEntitiesByKind('plant').length : 0); } catch (e) { plantsCount = 'err'; }
      try { treesCount = (typeof c.getTrees === 'function') ? c.getTrees().length : (c.getEntitiesByKind ? c.getEntitiesByKind('tree').length : 0); } catch (e) { treesCount = 'err'; }
      const meta = document.createElement('div'); meta.innerHTML = `<strong>${c.key}</strong> <span class="chunk-meta">dirty:${c.dirty?1:0} items:${itemsCount} objs:${objectsCount} plants:${plantsCount} trees:${treesCount}</span>`;
      const actions = document.createElement('div');
      const view = document.createElement('button'); view.textContent = 'View'; view.onclick = () => { this.details.value = JSON.stringify(c, null, 2); };
      const exp = document.createElement('button'); exp.textContent = 'Export'; exp.onclick = async () => {
        if (!this.worldSystem) return alert('no WorldSystem');
        exp.disabled = true;
        try {
          const res = await this.worldSystem.saveChunkByKey(c.key);
          alert(JSON.stringify(res));
        } catch (e) { alert(String(e)); }
        exp.disabled = false;
      };
      actions.appendChild(view); actions.appendChild(exp);
      row.appendChild(meta); row.appendChild(actions);
      this.list.appendChild(row);
    }
  }
}

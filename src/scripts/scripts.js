const world=document.getElementById('world'),stage=document.getElementById('stage');
const $=(h)=> {
  const t=document.createElement('div');
  t.innerHTML=h.trim();
  return t.firstChild
};
function plane(cls, w, h, tr, html) {
  const e=$(`<div class="wall ${cls}" style="width:${w}px;height:${h}px;margin:${-h/2}px 0 0 ${-w/2}px;transform:${tr}">${html||''}</div>`);
  world.appendChild(e);
  return e
}
const W=1000,H=600,D=500;
// walls
plane('wallpaper', W, H, `translateZ(${-D}px)`, `
<div class="rod"></div><div class="curtain" style="left:240px"></div><div class="curtain" style="left:650px"></div>
<div class="win"><div class="sky day"><div class="sun"></div><div class="cloud"></div></div><div class="sky nightsky"><div class="moon"></div></div><div class="bar-v"></div><div class="bar-h"></div></div>
<div class="poster" style="left:60px;top:150px;width:130px;height:180px;background:linear-gradient(135deg,#ff7a59,#ffd166 50%,#4ecdc4)"></div>
<div class="poster" style="left:810px;top:170px;width:120px;height:150px;background:linear-gradient(#1b1f4b,#6a4c93 60%,#f4a261)"></div>
<div class="base"></div>`);
plane('wallpaper', W, H, `translateZ(${D}px) rotateY(180deg)`, `
<div class="cork"><b style="left:20px;top:18px;transform:rotate(-6deg);background:#ffd1d1"></b><b style="left:95px;top:30px;transform:rotate(4deg);background:#d1ecff"></b><b style="left:165px;top:16px;transform:rotate(-3deg);background:#fff2a8"></b></div>
<div class="clock"><i id="hh" style="width:5px;height:30px;margin-left:-2px"></i><i id="mm" style="width:3px;height:42px;margin-left:-1px"></i><i id="ss" style="width:2px;height:46px;margin-left:-1px;background:#d33"></i></div>
<div class="base"></div>`);
plane('wallpaper', W, H, `translateX(${-D}px) rotateY(90deg)`, `
<div class="door"></div>
<div class="shelf" style="top:200px"></div><div class="books" style="top:110px">${[60,80,70,90,64,84,72,78,66,88,70].map((h,i)=>`<i style="height:${h}px;background:hsl(${i*37+10} 55% 52%)"></i>`).join('')}</div>
<div class="shelf" style="top:340px"></div><div class="books" style="top:250px">${[70,56,86,64,78,90,60,74].map((h,i)=>`<i style="height:${h}px;background:hsl(${i*47+200} 50% 48%)"></i>`).join('')}</div>
<div class="base"></div>`);
plane('wallpaper', W, H, `translateX(${D}px) rotateY(-90deg)`, `
<div class="poster" style="left:380px;top:90px;width:240px;height:160px;background:linear-gradient(#78c6ff,#ffe3a3 60%,#3a7d44 60%)"></div>
<div class="base"></div>`);
plane('floorbg', W, W, `translateY(${H/2}px) rotateX(90deg)`, `<div class="rug"></div><div class="lampglow"></div>`);
plane('ceil', W, W, `translateY(${-H/2}px) rotateX(-90deg)`, `<div class="ceillight"></div>`);
// 3D boxes
const shade= {
  f:'rgba(0,0,0,0)',b:'rgba(0,0,0,.28)',r:'rgba(0,0,0,.14)',l:'rgba(0,0,0,.22)',t:'rgba(255,255,255,.14)',u:'rgba(0,0,0,.4)'
};
function box(o) {
  const e=$(`<div class="box" style="transform:translate3d(${o.x}px,${o.y}px,${o.z}px) rotateY(${o.ry||0}deg)"></div>`);
  [['f',o.w,o.h,`translateZ(${o.d/2}px)`],['b',o.w,o.h,`rotateY(180deg) translateZ(${o.d/2}px)`],['r',o.d,o.h,`rotateY(90deg) translateZ(${o.w/2}px)`],['l',o.d,o.h,`rotateY(-90deg) translateZ(${o.w/2}px)`],['t',o.w,o.d,`rotateX(90deg) translateZ(${o.h/2}px)`],['u',o.w,o.d,`rotateX(-90deg) translateZ(${o.h/2}px)`]].forEach(([k, w, h, tr])=> {
    const f=$(`<div class="face ${o.glow?'glow':''}" style="width:${w}px;height:${h}px;margin:${-h/2}px 0 0 ${-w/2}px;transform:${tr};background:linear-gradient(${shade[k]},${shade[k]}),${o.c};${o.round?'border-radius:'+o.round+'px':''}">${k==='f'&&o.front?o.front:''}</div>`); 
    e.appendChild(f)
  });
  world.appendChild(e);
  return e
}
const FY=H/2;
// floor y
const on=(h)=>FY-h/2;
// center y for box resting on floor
// bed (head against right wall)
box( {
  w:370, h:50, d:250, x:310, y:on(50), z:-110, c:'#6b4428'
});
box( {
  w:30, h:150, d:250, x:485, y:on(150), z:-110, c:'#5a3820'
});
box( {
  w:350, h:36, d:236, x:305, y:FY-50-18, z:-110, c:'#f2efe9'
});
box( {
  w:250, h:14, d:240, x:360, y:FY-86-7, z:-110, c:'#7b4bbf'
});
box( {
  w:80, h:22, d:100, x:440, y:FY-86-11, z:-175, c:'#fffaf0', round:10
});
box( {
  w:80, h:22, d:100, x:440, y:FY-86-11, z:-45, c:'#fffaf0', round:10
});
// nightstand + lamp
box( {
  w:80, h:90, d:90, x:455, y:on(90), z:95, c:'#7c4e2e'
});
box( {
  w:16, h:36, d:16, x:455, y:FY-90-18, z:95, c:'#444'
});
box( {
  w:44, h:36, d:44, x:455, y:FY-126-18, z:95, c:'#ffe3a0', glow:true
});
// desk (against front wall z=+500)
box( {
  w:340, h:12, d:140, x:-120, y:FY-150, z:425, c:'#a8754a'
});
[[-270,355],[30,355],[-270,495],[30,495]].forEach(([x, z])=>box( {
  w:12, h:150, d:12, x, y:on(150), z:z-70+0, c:'#6d4527'
}));
box( {
  w:130, h:84, d:8, x:-120, y:FY-162-42, z:450, ry:180, c:'#1a1a1f', front:'<div class="screen"><p>$ whoami</p><p>guilherme.luz</p><p>estudante_ADS = true</p><p>// aberto a estágio</p></div>', glow:true
});
box( {
  w:20, h:30, d:20, x:-120, y:FY-162-15, z:450, c:'#2a2a30'
});
box( {
  w:150, h:6, d:50, x:-120, y:FY-162-3, z:390, c:'#2c2f3a'
});
box( {
  w:30, h:34, d:30, x:-250, y:FY-162-17, z:440, c:'#e8e2d4', round:6
});
// chair
box( {
  w:80, h:12, d:80, x:-120, y:FY-95, z:300, c:'#2f6f73'
});
box( {
  w:80, h:90, d:10, x:-120, y:FY-95-45, z:262, c:'#2f6f73'
});
box( {
  w:12, h:84, d:12, x:-120, y:on(84), z:300, c:'#333'
});
box( {
  w:60, h:6, d:60, x:-120, y:on(6), z:300, c:'#333'
});
// plant
box( {
  w:50, h:60, d:50, x:-440, y:on(60), z:-440, c:'#c4623f'
});
[[0,-100,60],[18,-130,50],[-18,-120,46]].forEach(([dx, dy, s])=>box( {
  w:s, h:s, d:s, x:-440+dx, y:FY-60+dy+30, z:-440, c:'#3f9a52', round:4
}));
// wardrobe-ish chest under the shelf
box( {
  w:90, h:60, d:300, x:-445, y:on(60), z:0, c:'#6d4527'
});
box( {
  w:260, h:150, d:10, x:-470, y:FY-60-75, z:0, ry:90, c:'#101114', glow:true, front:'<div class="tv"><h4>HABILIDADES</h4><span>Python</span><span>JavaScript</span><span>C++</span><span>PHP</span><span>HTML5</span><span>CSS3</span><span>Flask</span><span>SQLite</span><span>Git</span><span>GitHub</span><span>VS Code</span></div>'
});
// views
const views=[
 {
  n:'Experiências',ry:0,rx:2,z:140,t:'A janela',d:'Alterne entre dia e noite no botão no topo.'
},
 {
  n:'Hobbies',ry:90,rx:10,z:170,t:'A cama',d:'Colcha azul, dois travesseiros e um abajur na mesinha.'
},
 {
  n:'Sobre mim',ry:180,rx:4,z:150,t:'A mesa de estudos',d:'Monitor ligado, teclado, caneca e um relógio que mostra a hora real.'
},
 {
  n:'Habilidades',ry:270,rx:3,z:150,t:'Porta e estante',d:'Livros coloridos, uma porta de madeira e o baú no canto.'
},
 {
  n:'Início',ry:-38,rx:-30,z:-760,t:'Visão geral',d:'Vista de fora: as paredes mais próximas ficam transparentes.'
}];
let cur= {
  ry:0,rx:2,z:140
},idx=0;
const sc=()=>Math.min(1, innerWidth/1150, innerHeight/760+.25);
function apply() {
  world.style.transform=`scale(${sc()}) translateZ(${cur.z}px) rotateX(${cur.rx}deg) rotateY(${cur.ry}deg)`
}
const INFO=[
`<h2>Experiências</h2><h3>Vendedor — Kopenhagen <small>Aeroporto de Viracopos · Nov/2024 – Atual</small></h3><ul><li>Atendimento ao cliente em ambiente de alto fluxo</li><li>Organização e controle de estoque</li><li>Registro de vendas e indicadores</li><li>Trabalho com metas e resultados</li></ul><h3>Jovem Aprendiz — Samsung Eletrônica / Amazonia LTDA <small>Abr/2022 – Ago/2023</small></h3><ul><li>Organização documental e apoio administrativo</li><li>Digitalização e arquivamento</li><li>Elaboração de planilhas e relatórios</li></ul>`,
`<h2>Hobbies</h2><ul><li>Entender como os computadores funcionam: hardware, imagens, cores e sons</li><li>Projetos pessoais: StockFlow (controle de estoque) e um agente de IA para o ENEM</li><li>Estudar programação com cursos e praticar no GitHub</li></ul>`,
`<h2>Sobre mim</h2><p>Estudante de Análise e Desenvolvimento de Sistemas na UNIMETROCAMP Wyden, com conhecimentos em Python, JavaScript, HTML5, CSS3 e Flask. Experiência em atendimento, estoque e rotinas administrativas. Perfil organizado, proativo e orientado a resultados.</p><h3>Contato</h3><ul><li>Campinas – SP</li><li><a href="mailto:guilherme3luz@outlook.com">guilherme3luz@outlook.com</a></li><li>19-99283-5421</li><li><a href="https://github.com/Devsantosz" target="_blank" rel="noopener">github.com/Devsantosz</a></li></ul>`,
`<h2>Habilidades</h2><ul><li><b>Linguagens:</b> Python, JavaScript, C++, PHP</li><li><b>Front-end:</b> HTML5, CSS3</li><li><b>Back-end:</b> Flask</li><li><b>Banco de dados:</b> SQLite</li><li><b>Ferramentas:</b> Git, GitHub, VS Code</li><li><b>Idiomas:</b> Português (nativo), Inglês básico (leitura técnica)</li></ul>`,
`<h2>Guilherme Luz</h2><p><b>Objetivo:</b> estágio ou posição júnior em Desenvolvimento Web / Programação.</p><h3>Formação <small>ADS · UNIMETROCAMP Wyden · Ago/2026 – Dez/2028 (previsão)</small></h3><ul><li>Ensino Médio completo — E.E. Professor Luiz Gonzaga da Costa (2023)</li></ul><h3>Cursos</h3><ul><li>Curso em Vídeo: Algoritmos e Lógica (40h), HTML5 e CSS3 (200h), JavaScript (40h), Git e GitHub (20h)</li><li>Fundação Bradesco: Python (53h)</li></ul><p>Use os botões abaixo para explorar o quarto.</p>`];
const nav=document.getElementById('nav'),cap=document.getElementById('cap');
views.forEach((v, i)=> {
  const b=document.createElement('button'); b.textContent=v.n; b.onclick=()=>go(i); nav.appendChild(b)
});
function go(i) {
  idx=(i+views.length)%views.length;
  const v=views[idx];
  world.classList.remove('drag');
  const k=360*Math.round((cur.ry-v.ry)/360);
  cur= {
    ry:v.ry+k,rx:v.rx,z:v.z
  };
  apply();
  [...nav.children].forEach((b, j)=>b.classList.toggle('on', j===idx));
  cap.style.opacity=0;
  setTimeout(()=> {
    cap.innerHTML=INFO[idx]; cap.scrollTop=0; cap.style.opacity=1
  }, 500)
}
addEventListener('keydown', e=> {
  if(e.key==='ArrowRight' || e.key === "a")go(idx===4?0:(idx+1)%4); if(e.key==='ArrowLeft'|| e.key === "d")go(idx===4?3:(idx+3)%4); if(e.key==='ArrowUp'|| e.key === "w")go(4); if(e.key==='ArrowDown'|| e.key === "s")go(0)
});
// drag
let dr=null;
stage.addEventListener('pointerdown', e=> {
  dr= {
    x:e.clientX, y:e.clientY
  }; stage.setPointerCapture(e.pointerId); world.classList.add('drag')
});
stage.addEventListener('pointermove', e=> {
  if(!dr)return; cur.ry-=(e.clientX-dr.x)*.25; cur.rx=Math.max(-40, Math.min(40, cur.rx+(e.clientY-dr.y)*.2)); dr= {
    x:e.clientX, y:e.clientY
  }; apply()
});
const end=()=> {
  dr=null
};
stage.addEventListener('pointerup', end);
stage.addEventListener('pointercancel', end);
stage.addEventListener('wheel', e=> {
  world.classList.add('drag'); cur.z=Math.max(-900, Math.min(330, cur.z-e.deltaY*.4)); apply()
},  {
  passive:true
});
addEventListener('resize', apply);
// day/night
const tog=document.getElementById('tog');
tog.onclick=()=> {
  const n=document.body.classList.toggle('night');
  tog.textContent=n?'☀️ Dia':'🌙 Noite'
};
// clock
function tick() {
  const d=new Date(),s=d.getSeconds(),m=d.getMinutes()+s/60,h=(d.getHours()%12)+m/60;
  ss.style.transform=`rotate(${s*6}deg)`;
  mm.style.transform=`rotate(${m*6}deg)`;
  hh.style.transform=`rotate(${h*30}deg)`
}
tick();
setInterval(tick, 1000);
// intro: start overview and fly in
cur= {
  ry:-38,rx:-30,z:-760
};
apply();
setTimeout(()=>go(0), 400);

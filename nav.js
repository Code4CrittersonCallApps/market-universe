(function(){if(window.__muNav)return;window.__muNav=1;
var H='https://code4crittersoncallapps.github.io/market-universe/',B='https://code4crittersoncallapps.github.io/';
var M={'market-universe/board/crypto.html':['Crypto','',['market-universe/board/macro.html','market-universe/charts/universe.html','market-universe/charts/calls.html']],
'market-universe/board/macro.html':['Geopolitics','',['market-universe/board/crypto.html','market-universe/machine.html']],
'market-universe/board/free.html':['Crypto','',['market-universe/board/crypto.html','market-universe/board/macro.html']],
'market-universe/machine.html':['Universe','',['market-universe/hub/']],
'market-universe/charts/':['Universe','',['market-universe/charts/calls.html','market-universe/machine.html']],
'market-universe/charts/index.html':['Universe','',['market-universe/charts/calls.html','market-universe/machine.html']],
'market-universe/charts/chart.html':['Universe','',['market-universe/charts/','market-universe/charts/calls.html']],
'market-universe/charts/congress.html':['Universe','',['market-universe/charts/calls.html','market-universe/charts/rolodex.html']],
'market-universe/charts/rolodex.html':['Universe','',['market-universe/charts/calls.html','market-universe/charts/']],
'market-universe/charts/calls.html':['Universe','',['market-universe/charts/','market-universe/machine.html']],
'market-universe/charts/crushed.html':['Universe','',['market-universe/charts/universe.html','market-universe/machine.html','market-universe/charts/congress.html']],
'market-universe/charts/universe.html':['Universe','',['market-universe/charts/crushed.html','market-universe/machine.html']],
'market-universe/hub/':['Crypto','',['market-universe/machine.html']],
'picks-playbook/':['My trades','Coins & ranges',['picks-playbook/roster.html','picks-playbook/ranges.html','picks-playbook/coiled.html','picks-playbook/briefing.html']],
'picks-playbook/index.html':['My trades','Coins & ranges',['picks-playbook/roster.html','picks-playbook/ranges.html','picks-playbook/coiled.html','picks-playbook/briefing.html']],
'picks-playbook/roster.html':['My trades','Coins & ranges',['picks-playbook/','picks-playbook/ranges.html','picks-playbook/coiled.html']],
'picks-playbook/ranges.html':['My trades','Coins & ranges',['picks-playbook/','picks-playbook/roster.html','picks-playbook/coiled.html']],
'picks-playbook/coiled.html':['My trades','Coins & ranges',['picks-playbook/','picks-playbook/roster.html','picks-playbook/ranges.html']],
'picks-playbook/briefing.html':['My trades','Coins & ranges',['picks-playbook/','chart-caller/','correlation-lab/regimes.html']],
'picks-playbook/glossary.html':['My trades','Learning',['setup-cards/','setup-cards/cycles.html']],
'setup-cards/':['My trades','Learning',['setup-cards/cycles.html','setup-cards/clocks.html','setup-cards/crashes.html','picks-playbook/glossary.html']],
'setup-cards/index.html':['My trades','Learning',['setup-cards/cycles.html','setup-cards/clocks.html','setup-cards/crashes.html']],
'setup-cards/cycles.html':['Crypto','',['setup-cards/','setup-cards/clocks.html','setup-cards/crashes.html']],
'setup-cards/clocks.html':['Crypto','',['setup-cards/','setup-cards/cycles.html','setup-cards/crashes.html']],
'setup-cards/crashes.html':['Geopolitics','',['setup-cards/cycles.html','correlation-lab/regimes.html']],
'chart-caller/':['Crypto','',['picks-playbook/','picks-playbook/ranges.html']],
'chart-caller/index.html':['Crypto','',['picks-playbook/','picks-playbook/ranges.html']],
'correlation-lab/':['Geopolitics','',['correlation-lab/regimes.html','correlation-lab/leaders.html']],
'correlation-lab/index.html':['Geopolitics','',['correlation-lab/regimes.html','correlation-lab/leaders.html']],
'correlation-lab/regimes.html':['Geopolitics','',['correlation-lab/','correlation-lab/leaders.html']],
'correlation-lab/leaders.html':['Stocks','',['correlation-lab/','correlation-lab/regimes.html']]};
var N={'market-universe/board/free.html':'Free Money Board','market-universe/board/crypto.html':'BTC Scenario Board','market-universe/board/macro.html':'Macro board','picks-playbook/':'Playbook','picks-playbook/roster.html':'Roster','picks-playbook/ranges.html':'Ranges','picks-playbook/coiled.html':'Coiled','picks-playbook/briefing.html':'Briefing','picks-playbook/glossary.html':'Glossary','setup-cards/':'Setup cards','setup-cards/cycles.html':'Cycles','setup-cards/clocks.html':'Clocks','setup-cards/crashes.html':'Crashes','chart-caller/':'Chart Caller','correlation-lab/':'Correlation Lab','correlation-lab/regimes.html':'Regimes','correlation-lab/leaders.html':'Leaders','market-universe/machine.html':'Market Monitor','market-universe/charts/':'Chart book','market-universe/charts/calls.html':'Call ledger','market-universe/charts/rolodex.html':'Smart-money rolodex','market-universe/charts/congress.html':'Congress copy-trade','market-universe/charts/chart.html':'Chart','market-universe/charts/crushed.html':'Crushed coins','market-universe/charts/universe.html':'Buyable universe'};
var p=location.pathname.replace(/^\//,'');var m=M[p]||M[p.replace(/[^/]*$/,'')];if(!m&&p.indexOf('market-universe/hub')===0)m=M['market-universe/hub/'];
var e=function(s){return encodeURIComponent(s)};var bar=document.createElement('div');bar.id='mu-nav';
bar.style.cssText='position:sticky;top:0;z-index:99999;background:#0b0f17;border-bottom:1px solid #f0b90b;color:#e8ecf3;font:13px system-ui;padding:6px 10px;display:flex;flex-wrap:wrap;gap:8px;align-items:center';
var a=function(h,t,c){return '<a href="'+h+'" style="color:'+(c||'#f0b90b')+';text-decoration:none">'+t+'</a>'};
var s=a(H+'#/','Global Market Map')+' '+a(H+'board/crypto.html','BTC Scenario Board','#f0b90b')+' '+a(H+'board/macro.html','Macro board','#f0b90b')+' '+a(H+'board/free.html','Free money','#2ecc71')+' '+a(H+'machine.html','Market Monitor','#7fd1ff')+' '+a(H+'charts/','Chart book','#7fd1ff')+' '+a(H+'charts/calls.html','Call ledger','#7fd1ff')+' '+a(H+'charts/rolodex.html','Smart-money rolodex','#7fd1ff')+' '+a(H+'charts/congress.html','Congress copy-trade','#7fd1ff')+' '+a(H+'charts/crushed.html','Crushed coins','#7fd1ff');
if(m){if(m[0]!=='Universe')s+=' › '+a(H+'#/'+e(m[0]),m[0]);if(m[1])s+=' › '+a(H+'#/'+e(m[0])+'/'+e(m[1]),m[1]);s+=' › <b>'+(N[p]||N[p.replace(/index\.html$/,'')]||document.title.slice(0,30))+'</b><span style="opacity:.5">|</span>'+m[2].map(function(x){return a(B+x,N[x]||x,'#9fb0cc')}).join(' · ')}
bar.innerHTML=s;var go=function(){document.body.insertBefore(bar,document.body.firstChild)};document.body?go():document.addEventListener('DOMContentLoaded',go)})();

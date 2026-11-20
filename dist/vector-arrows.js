(()=>{
 'use strict';
 const shapes={'↗':'M5 19 19 5M5 5h14v14','↘':'M5 5 19 19M5 19h14V5','↖':'M19 19 5 5M5 19V5h14','↙':'M19 5 5 19M5 5v14h14','→':'M4 12h16m-6-6 6 6-6 6','←':'M20 12H4m6-6-6 6 6 6','↑':'M12 20V4m-6 6 6-6 6 6','↓':'M12 4v16m-6-6 6 6 6-6'};
 const pattern=/[↗↘↖↙→←↑↓]/g;
 function convert(root){
  if(root.nodeType===1&&root.closest('script,style,svg,textarea,input,title,noscript'))return;
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const nodes=[];
  if(root.nodeType===3)nodes.push(root);else while(walker.nextNode())nodes.push(walker.currentNode);
  for(const text of nodes){const parent=text.parentElement;if(!parent||parent.closest('script,style,svg,textarea,input,title,noscript')||!/[↗↘↖↙→←↑↓]/.test(text.data))continue;
   const fragment=document.createDocumentFragment();let start=0;
   for(const match of text.data.matchAll(pattern)){fragment.append(document.createTextNode(text.data.slice(start,match.index)));const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('class','ui-arrow-vector');svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');const path=document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d',shapes[match[0]]);svg.append(path);fragment.append(svg);start=match.index+match[0].length;}
   fragment.append(document.createTextNode(text.data.slice(start)));parent.classList.add('has-vector-arrow');text.replaceWith(fragment);
  }
 }
 convert(document.body);
 new MutationObserver(records=>{for(const record of records)for(const node of record.addedNodes)if(node.nodeType===1||node.nodeType===3)convert(node)}).observe(document.body,{childList:true,subtree:true});
})();

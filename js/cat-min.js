!function(){const t=document.createElement("div");let e=32,n=32,i=0,l=0,o=0,c=0,a=null,r=0;const s={idle:[[-3,-3]],alert:[[-7,-3]],scratch:[[-5,0],[-6,0],[-7,0]],tired:[[-3,-2]],sleeping:[[-2,0],[-2,-1]],N:[[-1,-2],[-1,-3]],NE:[[0,-2],[0,-3]],E:[[-3,0],[-3,-1]],SE:[[-5,-1],[-5,-2]],S:[[-6,-3],[-7,-2]],SW:[[-5,-3],[-6,-1]],W:[[-4,-2],[-4,-3]],NW:[[-1,0],[-1,-1]]};function d(e,n){const i=s[e][n%s[e].length];t.style.backgroundPosition=`${32*i[0]}px ${32*i[1]}px`}function u(){a=null,r=0}t.id="cat",t.style.width="32px",t.style.height="32px",t.style.position="fixed",t.style.backgroundImage="url('images/cat.gif')",t.style.imageRendering="pixelated",t.style.left="16px",t.style.top="16px",document.body.appendChild(t),document.onmousemove=t=>{i=t.clientX,l=t.clientY},window.catInterval=setInterval((function(){o+=1;const s=e-i,p=n-l,h=Math.sqrt(s**2+p**2);if(h<10||h<48)!function(){switch(c+=1,c>10&&0==Math.floor(200*Math.random())&&null==a&&(a=["sleeping","scratch"][Math.floor(2*Math.random())]),a){case"sleeping":if(r<8){d("tired",0);break}d("sleeping",Math.floor(r/4)),r>192&&u();break;case"scratch":d("scratch",r),r>9&&u();break;default:return void d("idle",0)}r+=1}();else{if(a=null,r=0,c>1)return d("alert",0),c=Math.min(c,7),void(c-=1);direction=p/h>.5?"N":"",direction+=p/h<-.5?"S":"",direction+=s/h>.5?"W":"",direction+=s/h<-.5?"E":"",d(direction,o),e-=s/h*10,n-=p/h*10,t.style.left=e-16+"px",t.style.top=n-16+"px"}}),100)}();
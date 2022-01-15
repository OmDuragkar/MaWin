let cf = -1;
let fid = 0;
let totalfolder = [];
let bread= [{fname:"Home", cid:-1}];
(function (){
    let addfolderbtn = document.querySelector('#addbtn')
    function settingbread(e){
        let x = e.target.getAttribute("cid");
        // console.log(x);
        x = parseInt(x);
        bread=bread.filter(v=>parseInt(v.cid)<=x);
        cf = x;
        savetols();
        showbread();
        showfoldertohtml();
    };
    addfolderbtn.addEventListener('click',e=>{addfolder(e)});
    function addfolder(e){
        e.preventDefault();
        
        let folderName = prompt("Enter folder's name: ");
        if(!folderName){
            alert('Enter a valid Name');
        }
        else{

            folderName = folderName.trim();
            folderin = totalfolder.some(v=>v.name === folderName && v.cid == cf);
            if(folderin){
                alert(`${folderName} is already taken!`);
                
            }
            else{
                fid++;
                addfoldertoarray(folderName, fid, cf);
            }
        }
    }
    function addfoldertoarray(name, fid, cid){
        totalfolder.push({name, fid, cid});
        console.log(totalfolder);
        savetols();
        showfoldertohtml();
    }

    function showfoldertohtml(){
       let maindiv = document.querySelector('#foldercontainer');
       maindiv.innerHTML ="";
       if(totalfolder.length>0){
            totalfolder.map(v=>{
                if(v.cid == cf){

                    let template =  document.querySelector('#mytemplate');
                    
                    let folderCopy = template.content.querySelector('.folder');
                    
                    let origfolder = document.importNode(folderCopy, true);
                    
                    origfolder.setAttribute('fid', v.fid);
                    let fo = origfolder.querySelector('.fname');
                    let folderedit = origfolder.querySelector('[action = "edit"]');
                    folderedit.addEventListener('click', e=>{editfolderName(e)});
                    let folderdelete = origfolder.querySelector('[action = "delete"]');
                    folderdelete.addEventListener('click', deletefolderName);
                    let folderview = origfolder.querySelector('[action = "view"]');
                    folderview.addEventListener('click', viewfolderName);
                    fo.innerHTML = v.name;
                    maindiv.appendChild(origfolder);
                }
            });
        }   
    }

    function viewfolderName(){
        let parentDiv = this.parentNode;
        let fidn = parentDiv.getAttribute('fid');
        let fname = parentDiv.querySelector('.fname').innerHTML;
        bread.push({fname,cid:fidn});
        cf= fidn;
        savetols();
        showbread();
    }
    function showbread(){
        document.querySelector('#divusage2').innerHTML="";
        bread.forEach(v=>{
            if(v.cid == -1){

                let x = document.querySelector("#mytemplate");
                x = document.importNode(x, true);
                let bname = x.content.querySelector(".breadcrumstop");
                bname.innerHTML = v.fname;
                bname.setAttribute("cid", v.cid);
                bname.addEventListener('click', (e)=>{settingbread(e)})
                document.querySelector('#divusage2').appendChild(bname);
            }else{
                
                let x = document.querySelector("#mytemplate");
                x = document.importNode(x, true);
                
                let bname = x.content.querySelector(".breadcrumstop");
                bname.innerHTML = v.fname;
                bname.setAttribute("cid", v.cid);
                bname.addEventListener('click', (e)=>{settingbread(e)})
                let y = document.createElement('span');
                y.innerHTML = " &nbsp; > &nbsp; "
                document.querySelector('#divusage2').appendChild(y);
                document.querySelector('#divusage2').appendChild(bname);
            }
        })
        cf = bread[bread.length - 1].cid;
        showfoldertohtml();

    }

    function deletefolderName(){
        let parentDiv = this.parentNode;
        if(confirm(`Are you sure You wanna delete ${parentDiv.querySelector('.fname').innerHTML}?`)){
            let fidn = parentDiv.getAttribute('fid');
            totalfolder = totalfolder.filter(v=>{
                if(v.fid == fidn && v.cid == cf){
                    return false;
                }else{
                    return true;
                }
            })
            savetols();
            showfoldertohtml();
        }
    }
    function editfolderName(e){
        let parentDiv = e.target.parentNode.parentNode;
        let newfname = prompt('Enter New Name: ');
        if(!newfname){
            alert('Enter a valid Name');
        }
        else{

            newfname = newfname.trim();
            folderin = totalfolder.some(v=>v.name === newfname && v.cid == cf);
            if(folderin){
                alert(`${newfname} is already taken!`);
                
            }
            else{
                console.log(parentDiv);
                let fidn = parentDiv.getAttribute('fid');
                console.log(cf);
                console.log(fidn);
                let xindex = totalfolder.findIndex(v=>{
                    // console.log(v);
                    return (v.fid == fidn && v.cid == cf);
                })
                // console.log(x);
                if(xindex != -1){
                    totalfolder[xindex].name = newfname;
                    savetols();
                    showfoldertohtml();
                }
                else{
                    alert('Nothing Found');
                }
            }
        }
    }
    function savetols(){
        localStorage.setItem('totalfolder', JSON.stringify(totalfolder));
        localStorage.setItem('bread', JSON.stringify(bread));
    }
    function retrievefromls(){
        totbread = localStorage.getItem('bread')?JSON.parse(localStorage.getItem('bread')):[{fname:"Home", cid:-1}];
        if(totbread.length>0){
            bread = totbread;
        }
        totalfolder = localStorage.getItem('totalfolder')?JSON.parse(localStorage.getItem('totalfolder')):[];
        if(totalfolder.length>0){
            fid = (totalfolder[totalfolder.length - 1].fid);
        }
    }
    retrievefromls();
    showfoldertohtml();
    showbread(); 
})();
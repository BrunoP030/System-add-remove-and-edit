function loadData(id){
    getUrl(`${BASEURL}/disciplina/loadData/${id}`).then(res=>{
        if(res.data.length>0){
            var txtcod=document.querySelector("#txtcoddisc");
            var txtnome=document.querySelector("#txtnomedisc");
            var txtch=document.querySelector("#txtch");

                txtcod.value=res.data[0].codigo;
                txtcod.dispatchEvent(new Event('change'));

                txtnome.value=res.data[0].nome;
                txtnome.dispatchEvent(new Event('change'));

                txtch.value=res.data[0].carga;
                txtch.dispatchEvent(new Event('change'));

                activateLabel(document.querySelector("label[for='txtch']"));
                activateLabel(document.querySelector("label[for='txtnomedisc']"));

                showEdit();

        }
    });
}




function delData(id){
    if(confirm("Confirma a Exclusão do registro?")){
        var params={id: id};
        deleteItem(`${BASEURL}/disciplina/del`,params).then(res=>{
            alert(res.data.texto);
            if(res.data.codigo=="1"){
                listaDisc();
            }
        console.log(res.data)
        });
    }
}

function listaDisc(){
    document.querySelector("#lsdisc").innerHTML="";
    axios.post(BASEURL + "/disciplina/listaDisc").then(res=>{
        var txt=""
        for(var i=0; i<res.data.length;i++){
            var reg=res.data[i];
            var bEdit=`<a href='javascript:void(0)' onclick='loadData(${reg.codigo});' ><i class="fas fa-edit"></i></a>`
            var bDel= `<a href='javascript:void(0)' onclick='delData(${reg.codigo});'><i class="fas fa-trash"></i></a>`
            txt+=`<tr><td>${reg.nome}</td><td>${reg.carga}</td><td>${bEdit} ${bDel}</td></tr>`;
        }

        document.querySelector("#lsdisc").innerHTML=txt;

    });
}


    function reset(){
        document.querySelector("#frmCadDisc").reset();
        hideEdit();
    }
    document.addEventListener("DOMContentLoaded", () =>{
        reset();
        listaDisc();
        document.querySelector("#btnInc").addEventListener("click",function(){
            let form = document.querySelector("#frmCadDisc");
        postForm(`${BASEURL}/disciplina/addDisc`, form).then(res=>{
            alert(res.data.texto);
            if(res.data.codigo=="1"){
                reset()
                listaDisc()
                console.log(res.data)
            }
            })

        });
        document.querySelector("#btnSave").addEventListener("click",function(){
            let form = document.querySelector("#frmCadDisc");
        postForm(`${BASEURL}/disciplina/save`, form).then(res=>{
            alert(res.data.texto);
            if(res.data.codigo=="1"){
                reset()
                listaDisc()
            }    
            })

        document.querySelector("#btnCancel").addEventListener("click",function(){
            reset();
        })
        })
    })

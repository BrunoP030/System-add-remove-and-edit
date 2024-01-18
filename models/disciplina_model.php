<?php

class Disciplina_Model extends Model {
    public function __construct(){
        parent::__construct();
    }
    public function listaDisc()
    {
        $result=$this->db->select("select codigo,nome,carga from escola.curso order by nome");
        echo(json_encode($result));
    }

    public function insert(){
        $x=file_get_contents('php://input');
        $x=json_decode($x);
        $ch=$x->txtch;
        $nomedisc=$x->txtnomedisc;

        $result=$this->db->insert('escola.curso', array('nome'=>$nomedisc, 'carga'=>$ch));
        if($result){
            $msg=array("codigo"=>1,"texto"=>"Registro inserido com sucesso");
        }
        else{
            $msg=array("codigo"=>0,"texto"=>"Erro ao inserir");
        }
        echo(json_encode($msg));
    }
    public function del(){
        $coddisc=(int)$_GET['id'];
        $msg=array("codigo"=>0, "texto"=>"Erro ao excluir");
        if($coddisc>0){
            $result=$this->db->delete('escola.curso', "codigo= '$coddisc'");
            if($result){
                $msg=array("codigo"=>1,"texto"=>"Registro excluido com sucesso");
            }
        }
        echo(json_encode($msg));
    }

    public function loadData($id){
        $cod=(int) $id;
        $result=$this->db->select('select codigo,nome,carga from escola.curso where codigo= :cod', array(":cod" =>$cod));
        $result=json_encode($result);
        echo($result);
    }

    public function save(){
        $x=file_get_contents('php://input');
        $x=json_decode($x);
        $coddisc=(int)$x->txtcoddisc;
        $nomedisc=$x->txtnomedisc;
        $ch=$x->txtch;
        $msg=array("codigo"=>0, "texto"=>"Erro ao atualizar");
        if($coddisc>0){
            $dadosSave=array('nome'=>$nomedisc, 'carga'=>$ch);

            $result=$this->db->update('escola.curso', $dadosSave,"codigo= '$coddisc'");
            if($result){
                $msg=array("codigo"=>1, "texto"=>"Registro atualizado com sucesso");
            }

        }
        echo(json_encode($msg));
    }
}

<?php

class Disciplina extends Controller {
    function __construct(){
        parent:: __construct();
        $this->view->js = array('disciplina/disciplinas.js');
    }

    function index() {
        $this->view->title ='Manutenção de Curso';
        $this->view->render('header');
        $this->view->render('disciplina/index');
        $this->view->render('footer');
    }
    function addDisc() {
        $this->model->insert();
    }
    function listaDisc(){
        $this->model->listaDisc();
    }
    function Del() {
        $this->model->del();
    }
    function loadData($id){
        $this->model->loadData($id);
    }
    function save(){
        $this->model->save();
    }
}



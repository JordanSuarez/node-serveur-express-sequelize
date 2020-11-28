const models = require('../models');

function save(req, res) {
    const project = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        vote: req.body.vote,
        githubUrl: req.body.githubUrl,
        projectUrl: req.body.projectUrl,
        userId: 1,
        partnerId: req.body.partnerId,
    };

    models.Project.create(project).then(result => {
        res.status(201).json({
            message: "Project saved successfully",
            project: result
        })
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        })
    })
}

function show(req, res) {
   const id = req.params.id;

    models.Project.findByPk(id).then(result => {
        result ? res.status(200).json(result) 
                : res.status(500).json({
                    message: "Project not found",
                })
        
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
        })
    })
}

function index(req, res) {
     models.Project.findAll().then(result => {
        res.status(200).json(result);
     }).catch(error => {
         res.status(500).json({
             message: "Something went wrong",
         })
     })
 }

 function update(req, res) {
   const id = req.params.id;
   const userId = 1

   const updatedProject = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        vote: req.body.vote,
        githubUrl: req.body.githubUrl,
        projectUrl: req.body.projectUrl,
        partnerId: req.body.partnerId,
    };

    models.Project.update(updatedProject, {where: {id: id, userId: userId}}).then(result => {
        res.status(200).json({
            message: "Project updated successfully",
            project: updatedProject
        })
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        })
    })
}

function destroy(req, res) {
    const id = req.params.id;
    const userId = 1;

    models.Project.destroy({where: {id: id, userId: userId}}).then(result => {
        res.status(200).json({
            message: "Project deleted successfully",
        })
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        })
    })
}

module.exports = {
    save: save,
    show: show,
    index: index,
    update: update,
    destroy: destroy
}
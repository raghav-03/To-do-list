const db = require('../config/mongoose');
const TODO = require('../models/todolist');
const User=require('../models/user');
var moment = require('moment'); 
// create task
module.exports.list=function(req,res){
    // getting today's date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    var DATE=req.body.date;
    var YYYY=DATE.substring(0,4);
    var MM=DATE.substring(5,7);
    var DD=DATE.substring(8,10);
    // check weather the date selected is possible or not to create task
    if(yyyy>YYYY){
        console.log('You Cannot Create this Task as this date has been Already Passed');
        return res.redirect('back');
    }
    else if(yyyy==YYYY){
        if(mm>MM){
            console.log('You Cannot Create this Task as this date has been Already Passed');
            return res.redirect('back');
        }
        else if(mm==MM){
            if(dd>DD){
                console.log('You Cannot Create this Task as this date has been Already Passed');
                return res.redirect('back');
            }
        }
    }
    // adding task to database 
    TODO.create({
        description: req.body.description,
        category: req.body.category,
        date: DATE,
        user: req.user._id
    },function(err,newList){
        if(err){
            console.log('Error in creating a list!')
            return  res.redirect('back');
        }
        console.log('******', newList);
        return  res.redirect('back');
    })
};
// display home
module.exports.home=function(req,res){
    TODO.find({},function(err,list){
        if(err){
            console.log('Error in fetching list');
            return;
        }
        res.render('home',{
            title: "To-do App",
            todo_list:list
        });
        return;
    });
};
// delete task
module.exports.delete=function(req,res){
    let id = req.body.task;
    //check weather their is any task or not
    if(id==undefined){
        console.log('Please Select any checkbox to Delete a Task');
        return res.redirect('back');
    }
    var size=id.length;
    for(let i=0;i<size;i++)
    {
        TODO.findByIdAndDelete(id,function(err){
            if(err){
                console.log('error in deleting the task');
                return;
            }
     });
    }
    return res.redirect('back');
};
module.exports.login=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('back');
    }
    res.render('index',{
        title: "To-do App",
    });
    return;
}
module.exports.create=function(req,res){
    if (req.body.password != req.body.confirm_password){
        req.flash('error',' Password Not Matched ')
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}
                req.flash('success','Signed-Up successfully ');
                return res.redirect('back');
            })
        }else{
            req.flash('error',' User already exist Plz Sign-In ');
            return res.redirect('back');
        }

    });
}
module.exports.createsession=function(req,res){
    req.flash('success',' Logged In Successfully ')
    return res.redirect('/');
}
module.exports.destroy=function(req,res){
    req.logout();
    req.flash('success',' Logged out Successfully ')
    res.redirect('index');
};

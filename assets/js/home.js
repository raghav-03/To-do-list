//check weather their is any task or not and any slected task or not to delete
function delfunction() {
    var checkBox = document.getElementById("checked");
    if(checkBox==undefined){
        alert('Please Enter any Task to Delete');
    }
    if (checkBox.checked == false){
         alert('Please Select any checkbox to Delete a Task');
    }
  }
// function to get today's date
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;
// check weather the date selected is possible or not to create task
function check(){
    var date = document.getElementById("date1").value;
    var YYYY=date.substring(0,4);
    var MM=date.substring(5,7);
    var DD=date.substring(8,10);
    if(yyyy>YYYY){
        alert('You Cannot Create this Task as this date has been Already Passed');
        return res.redirect('back');
    }
    else if(yyyy==YYYY){
        if(mm>MM){
            alert('You Cannot Create this Task as this date has been Already Passed');
            return res.redirect('back');
        }
        else if(mm==MM){
            if(dd>DD){
                alert('You Cannot Create this Task as this date has been Already Passed');
                return res.redirect('back');
            }
        }
    }
}
//set default value of date to today's date 
var date=document.getElementById('date1').defaultValue=today;
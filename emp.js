var arr = [];

function Employee(empId, name, dept) {
    this.empId = empId;
    this.name = name;
    this.dept = dept;
}
var emp = new Employee();

Employee.prototype.addEmp = function () {
    arr = emp.getEmployeesFromString(localStorage.getItem("employee"));
    var employee = { empId: this.empId, name: this.name, dept: this.dept };
    arr.push(employee);
    localStorage.setItem("employee", JSON.stringify(arr));
}

Employee.prototype.readEmp = function () {

    var res = emp.getEmployeesFromString(localStorage.getItem("employee"));
    stringEmp = "<tr><th> EmpID</th><th>Name</th><th>Department</th><th>Actions</th></tr >";
    for (let i = 0; i < res.length; i++) {
        stringEmp += "<tr><td>" + res[i].empId + "</td>" +
            "<td>" + res[i].name + "</td>" +
            "<td>" + res[i].dept +
            "</td> <td><span id='clickableAwesomeFont'> <i class='fa fa-pencil-square-o' onclick='updateEmployee(" + res[i].empId + ")'aria-hidden='true'></i></span>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;" +
            "<span id='clickableAwesomeFont'><i class='fa fa-trash'aria-hidden='true' onclick='deleteEmp(" + res[i].empId + ")'></i></span></td></tr>";
    }
    document.getElementById("result").innerHTML = stringEmp;
}

Employee.prototype.getEmployeesFromString = function (str) {
    try {
        if (!str) {
            return [];
        }
        console.log(str);
        return JSON.parse(str);
    } catch (e) {
        return [];
    }
}

Employee.prototype.delEmp = function () {
    arr = emp.getEmployeesFromString(localStorage.getItem("employee"));
    var index = arr.findIndex((element) => { return element.empId == empId });
    arr.splice(index, 1);
    localStorage.setItem("employee", JSON.stringify(arr));
    emp.readEmp();
}

function addEmployee(empId) {
    console.log("add called");
    if (empId != null) {
        show();
        document.forms["emp"]["empId"].value = empId;
        document.getElementById("empId").disabled = true;
        emp.delEmp(empId)
        return;
    }
    else if(empId==null){
    empId = document.forms["emp"]["empId"].value;
    name = document.forms["emp"]["name"].value;
    dept = document.forms["emp"]["dept"].value;
    }
    var emp1 = new Employee(empId, name, dept);
    emp1.addEmp();
    emp1.read();
    return false;
}

function deleteEmp(empId) {
    emp.delEmp(empId);
}

function updateEmployee(empId) {
    alert("Kindly make the updates as required");
    addEmployee(empId);
}

function show() {
    var x = document.getElementById("empForm");
    if (x.style.display == "block") { x.style.display = "none"; }
    else {
        x.style.display = "block";
    }
}

window.onload = emp.readEmp;
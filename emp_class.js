var arr = [];
class Employee {
    constructor(empId, name, dept) {
        this.empId = empId;
        this.name = name;
        this.dept = dept;
        
    }

    getEmployeesFromString(str) {
        try {
            if (!str) {
                return [];
            }
            return JSON.parse(str);
        } catch (e) {
            return [];
        }
    }

    addEmp() {
        console.log("inner add");
        var emp1 = { empId: this.empId, name: this.name, dept: this.dept };
        arr = emp.getEmployeesFromString(localStorage.getItem("employee"));
        console.log(arr);
        arr.push(emp1);
        console.log(arr);
        localStorage.setItem("employee", JSON.stringify(arr));
        emp.readEmp();
    }

    delEmp(empId) {
        console.log("inner delete");
        arr = emp.getEmployeesFromString(localStorage.getItem("employee"));
        var index = arr.findIndex((element) => { return element.empId == empId });
        arr.splice(index, 1);
        localStorage.setItem("employee", JSON.stringify(arr));
        emp.readEmp();
    }

    readEmp() {
        var res = emp.getEmployeesFromString(localStorage.getItem("employee"));
        var stringEmp = "<tr><th> EmpID</th><th>Name</th><th>Department</th><th>Actions</th></tr >";
        for (let i = 0; i < res.length; i++) {
            stringEmp += "<tr><td>" + res[i].empId + "</td>" +
                "<td>" + res[i].name + "</td>" +
                "<td>" + res[i].dept +
                "</td> <td><span id='clickableAwesomeFont'> <i class='fa fa-pencil-square-o' onclick='updateEmp(" + res[i].empId + ")'aria-hidden='true'></i></span>" +
                "&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<span id='clickableAwesomeFont'><i class='fa fa-trash'aria-hidden='true' onclick='deleteEmp(" + res[i].empId + ")'></i></span></td></tr>";
        }

        document.getElementById("result").innerHTML = stringEmp;
    }
}

var emp = new Employee();


function addEmployee(empId, name, dept) {
    console.log("add");
    if (empId != null) {
        show();
        document.forms["emp"]["empId"].value = empId;
        document.forms["emp"]["name"].value = name;
        document.forms["emp"]["dept"].value = dept;
        document.getElementById("empId").disabled = true;
        emp.delEmp(empId);
        return;
    }
    empId = document.forms["emp"]["empId"].value;
    name = document.forms["emp"]["name"].value;
    dept = document.forms["emp"]["dept"].value;
    var emp1 = new Employee(empId, name, dept);
    emp1.addEmp();


}
function deleteEmp(empId) {
    console.log("delete");
    emp.delEmp(empId);
}
function updateEmp(empId, name, dept) {
    console.log("update");
    arr = emp.getEmployeesFromString(localStorage.getItem("employee"));
    var index = arr.findIndex((element) => { return element.empId == empId });
    addEmployee(empId, arr[index].name, arr[index].dept);
}


window.onload = emp.readEmp;

function show() {
    var x = document.getElementById("empForm");
    if (x.style.display == "block") { x.style.display = "none"; }
    else {
        x.style.display = "block";
    }
}
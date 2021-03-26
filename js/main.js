
window.onload = function () {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '.' + mm + '.' + yyyy;
    document.getElementById('date').innerHTML =today;
    element = document.getElementById('wysiwygwrapper')
    console.log(element)
    element.addEventListener("keyup", handleDisplay);
    element.addEventListener("mouseup", handleDisplay);
};

function handleDisplay() {
    console.log("handle")
    document.getElementById('classNameLabel').innerHTML = document.getElementById('className').value;
    nicedit = document.getElementsByClassName('nicEdit-main')
    descrText =  nicedit[0].innerHTML
    descrText = descrText.replace('<b>','<strong>')
    descrText = descrText.replace('</b>','</strong>')
    if (descrText == "<br>" || descrText == "<div><br></div>") {
        descrText = ""
    }
    document.getElementById('projectnameLabel').innerHTML =descrText
    document.getElementById('lessonLabel').innerHTML = document.getElementById('lessonName').value;
    if (document.getElementById('lessonName').value) {
        document.getElementById('lesson').style.display = "flex";
        document.getElementById('classMeta').style.display = "block";

    } else {
        document.getElementById('lesson').style.display = "none";
    }
    if (document.getElementById('groupCount').value && parseInt(document.getElementById('groupCount').value) > 0) {
        document.getElementById('groups').style.display = "flex";
    } else {
        document.getElementById('groups').style.display = "none";
    }
    if (document.getElementById('className').value) {
        document.getElementById('class').style.display = "flex";
        document.getElementById('classMeta').style.display = "flex";
    } else {
        document.getElementById('class').style.display = "none";
    }
    if (!document.getElementById('className').value && !document.getElementById('lessonName').value) {
        document.getElementById('classMeta').style.display = "none";
    }
    if (descrText !== "" ) {
        document.getElementById('project').style.display = "block";
        document.getElementById('projectWrapper').style.display = "block";
    } else {
        document.getElementById('project').style.display = "none";
        document.getElementById('projectWrapper').style.display = "none";
    }
    setTitle(document.getElementById('className').value,document.getElementById('lessonName').value)
}

function updateStudentPresenceList() {
    count = document.getElementById('studentCount').value;
    if (count ) {
        count =parseInt(count);
        document.getElementById('selectonListTitle').style.display = "block";
        if (count == 0) {
            document.getElementById('selectonListTitle').style.display = "none";
        }
    } else {
        count = 0;
        document.getElementById('selectonListTitle').style.display = "none";
    }
    if (count > 50) {
        count =50;
    }
    student_presence =""
    for (var index=1;count+1> index;index++) {
        student_presence = student_presence + '<div class="student border"><div>'+index+'</div> <input id="student_'+index+'" type="checkbox" class="studentCheckbox" onclick="updateGroups()" checked ></div>'
    }
    document.getElementById('studentPresence').innerHTML = student_presence
    updateGroups()
}

function updateGroups() {
    handleDisplay()
    checkboxes = document.getElementsByClassName('studentCheckbox')
    activeStudents= []
    for (index=0;checkboxes.length > index;index++) {
        if (checkboxes[index].checked ) {
            activeStudents.push(checkboxes[index].id.replace('student_',''))
        }
    }
    if (activeStudents.length > 0) {
        groupCount = document.getElementById('groupCount').value;
        if (!groupCount || groupCount < 1) {
            groupCount = 1;
        }
        if (groupCount > 50) {
            groupCount = 50;
        }
        if (groupCount > activeStudents.length) {
            groupCount = activeStudents.length;
        }
        rest=0
        studentPerGroup= activeStudents.length/groupCount;
        while (studentPerGroup !== parseInt(studentPerGroup)) {
            rest +=1
            studentPerGroup= (activeStudents.length-rest)/groupCount;
        }
        if (studentPerGroup < 1) {
            studentPerGroup = 1;
        }
        parseGroups(activeStudents,studentPerGroup,rest);
    }
}

function parseGroups(students,studentsPerGroup,rest) {
    groups = [];
    group = [];
    while (students.length > 0) {
        rand = Math.floor(Math.random() * Math.floor(students.length-1));
        group.push(students.splice(rand, 1)[0])
        if (group.length === studentsPerGroup) {
            if (parseInt(rest) > 0) {
                group.push(students.splice(rand, 1)[0])
                rest -= 1;
            }
            groups.push(group)
            group =[]
        }
    }
    displayGroups(groups)
}

function displayGroups(groups) {
    groups_HTML = ""
    for (index=0;groups.length > index;index++) {
        studentStr=""
        group = groups[index]
        group_HTML = '<div id="group">'+
            '<div>Gruppe '+(index+1)+'</div><hr>\n' +
            '<div>\n';
        for (student=0;group.length > student;student++) {
            if (studentStr === "") {
                studentStr = group[student]
            } else {
                studentStr += ", "+group[student]
            }
        }
        group_HTML += studentStr
        group_HTML +=   '</div>  </div>'
        groups_HTML += group_HTML;
    }
    document.getElementById('groups').innerHTML =groups_HTML
    document.getElementById('groups').style.display = "flex"
    console.log(groups_HTML)
}

function setTitle(classname,lesson) {
    console.log("sds")
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy+ '-' + mm + '-' +dd  ;
    title = "Gruppenbildung_"+classname+"_"+lesson+"_"+today;
    document.title= title
}



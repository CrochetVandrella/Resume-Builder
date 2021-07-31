

/* Shortening some of the reusables */
let doc = document;
doc.qs = doc.querySelector;



/* Counting number of aditional fields for each category 
	(i.e experience, skills, tech skills) 
*/
let skillNum = 3;
let expNum = 1;

/* ADD SKILL
		This function adds a new skill to the resume builder.
		This will help determine how much space to allocate for the final outcome.
		Function cannot exceed 8 skills as this will cause malformatting to the overall result. 
*/
function addSkill() {
  skillNum++;

  if (skillNum < 8) {
    // Create NEW Element such as the duplication of the SKILL form
    let newLabel = doc.createElement("label");
    let newInput = doc.createElement("input");
    let skill = doc.createTextNode("Skills ");
    const linebreak = doc.createElement("br");

    // Ensure each label associates with the appropriate input field
    newLabel.setAttribute("for", "skill_" + skillNum);
    newLabel.appendChild(skill);
    newInput.type = "text";
    newInput.id = "skill_" + skillNum;

    // Stack new skills added
    const currentPlace = doc.qs("#newSkill");
    doc.qsExpertise = doc.qs("#expertise");
    doc.qsExpertise.insertBefore(newLabel, currentPlace);
    doc.qsExpertise.insertBefore(newInput, currentPlace);
    doc.qsExpertise.insertBefore(linebreak, currentPlace);
  } else {
    doc.qs("#newSkill").innerHTML = "Cannot Exceed 8 skills";
  }
}

// Action when "Add Skill" button has been triggered
doc.qs("#addSkill").addEventListener("click", addSkill);




/* ADD EXPERIENCE
		This function will clone the first div of the Experience form until the user no 
    longer has any more workplaces that they have attended.Used cloneNode function 
    to differientate between manual way and effective way of duplicating an element.
		User cannot exceed no more than 3 recent work experiences.
*/
function addExperience() {
  expNum++;
  let expBtn = doc.qs("#expArea");

  // Cloning Process
  if (expNum <= 3) {

    // Create Clones
    let exp = doc.qs("#experience_" + (expNum - 1));
    let newExp = exp.cloneNode(true);
    let childExp = newExp.querySelectorAll('[id]');
    let origExp = doc.qs("#experience_1").querySelectorAll('[id]');

    // Assign new ids
    newExp.id = "experience_" + expNum;
    for (const children in childExp) {
      if (typeof childExp[children].id === 'undefined') {
        break;
      } else {

        // Take originally made exp. form id an incrememt into new one
        childExp[children].id = origExp[children].id + "_" + expNum;
      }
    }


    // Resetting values of cloned element
    newExp.querySelector("#jobTitle_" + expNum).value = '';
    newExp.querySelector("#jobName_" + expNum).value = '';
    newExp.querySelector("#jobDesc_" + expNum).value = '';
    newExp.querySelector("#jobStart_" + expNum).value = '';
    newExp.querySelector("#jobEnd_" + expNum).value = '';
    newExp.querySelector("#jobCurrent_" + expNum).checked = false;


    // Post cleared clone
    doc.qs("#resumeForm").insertBefore(newExp, expBtn);
  }
}

// Action when "Add Experience" button has been triggered
doc.qs("#addExperience").addEventListener("click", addExperience);


function setPersonal(creatingWrite) {
  let phone = doc.qs("#phone").value;
  let email = doc.qs("#email").value;
  let website = doc.qs("#socialMedia").value;
  let address = doc.qs("#city").value + ", " + doc.qs("#state").value + " " + doc.qs("#zipCode").value;

  /* PERSONAL INFORMATION */
  creatingWrite += "<html lang=\"en\"><head><meta charset=\"UTF-8\"><link rel=\"stylesheet\" href=\"mystyle.css\"><title>Resume Result</title></head><body><div id=\"container\"><!-- LEFT --><div id=\"left-panel\" class=\"container-child\"><!-- ProFile Picture --><div id=\"pfp\"><img id=\"pfp-default\" src=\"https://api-private.atlassian.com/users/771eaa3714cc3088d0f778814141dd62/avatar\" /></div><!-- Contact Info --><div id=\"contact\"><h3>CONTACT</h3><div id=\"phone\"> <!-- phone --><img class=\"contact-icon\" src=\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzR5N6bc_UOD5A2waGIkAk94EKPIo8Y51Gs4ynd5fs7tUy0XXX5We2211PM_CsD9CG-sc&usqp=CAU\" /><p class=\"class-title\">Phone</p><p id=\"phoneNum1\">";
  creatingWrite += phone;
  creatingWrite += "</p><br></div><div id=\"email\"> <!-- email --><img class=\"contact-icon\" src=\"https://www.clipartmax.com/png/middle/211-2117664_clip-arts-related-to-email-icon-vector-png.png\" /><p class=\"class-title\">Email</p><p id=\"email1\">";
  creatingWrite += email;
  creatingWrite += "</p><br></div><div id=\"website\"> <!--website --><img class=\"contact-icon\" src=\"https://www.pikpng.com/pngl/m/32-321477_png-file-website-icon-vector-png-clipart.png\" /><p class=\"class-title\">Website</p><p id=\"website1\">";
  creatingWrite += website;
  creatingWrite += "</p><br></div><div id=\"address\"> <!-- address --><img class=\"contact-icon\" src=\"https://www.pngkit.com/png/detail/284-2845218_png-file-svg-address-icon-vector-white.png\" /><p class=\"class-title\">Address</p><p id=\"cityStateZip\">";
  creatingWrite += address;

  return creatingWrite;
}

function setTechnical(creatingWrite) {

  let tech1 = doc.qs("#tech1").value;
  let tech1_details = doc.qs("#tech1_details").value;
  let tech2 = doc.qs("#tech2").value;
  let tech2_details = doc.qs("#tech2_details").value;

  /* TECHNICAL SKILLS */
  creatingWrite += "</p><br></div></div><!-- Technical Skills --><div id=\"technical\"><h3>TECH. SKILLS</h3><div id=\"ts1\"><p id=\"tSkill1\" class=\"class-title\">";
  creatingWrite += tech1;
  creatingWrite += "</p><ul><li id=\"tSkill1_detail\">";
  creatingWrite += tech1_details;
  creatingWrite += "</li></ul></div><br><div id=\"ts2\"><p id=\"tSkill2\" class=\"class-title\">";
  creatingWrite += tech2;
  creatingWrite += "</p><ul><li id=\"tSkill2_detail\">";
  creatingWrite += tech2_details;

  return creatingWrite;

}

function setSkillSet(creatingWrite) {

  let skillList = doc.querySelectorAll('[id^="skill_"]');

  /* SKILL SETS */
  creatingWrite += "</li></ul></div></div><!-- Skill Set --><div id=\"expertise\"><h3>SKILL SET</h3><ul>";

  /* Gain each skill item and place into <li> */
  for (const skill in skillList) {
    if (typeof skillList[skill].value === 'undefined') {
      break;
    } else {
      creatingWrite += "<li>" + skillList[skill].value + "</li>";
    }

  }

  return creatingWrite;
}

function setName(creatingWrite) {

  let fname = doc.qs("#fname").value;
  let lname = doc.qs("#lname").value;

  /* NAME */
  creatingWrite += "</ul></div></div><!-- RIGHT --><div id=\"right-panel\" class=\"container-child\"><!-- Name --><div id=\"fname\"><h1>";
  creatingWrite += fname;
  creatingWrite += "</h1></div><div id=\"lname\"><h1>";
  creatingWrite += lname;

  return creatingWrite;
}

function setEducation(creatingWrite) {
  let edu = doc.qs("#edu").value;

  /* EDUCATION */
  creatingWrite += "</h1></div><!-- Education --><div id=\"education\"><h3>EDUCATION</h3><div><p id=\"edu1\">";
  creatingWrite += edu;
  creatingWrite += "</p></div></div><!-- Experience --><div id=\"experience\"><h3>EXPERIENCE</h3>";

  return creatingWrite;
}

function setExperience(creatingWrite) {

  let jobList = doc.querySelectorAll('[id^="job"]');
  let jobListLength = doc.querySelectorAll('[id^="experience"]').length;
  let isChecked = false; // check if job is current 


  /* EXPERIENCES */
  let numOfJobs = 1;
  let eachExp = []; //array for each block of job experience information

  creatingWrite += "<div><p class=\"class-title\">";
  for (const job in jobList) {
    if (typeof jobList[job].value === 'undefined') {
      //console.log(numOfJobs);
      break;
    } else {

      if (numOfJobs % 6 != 0) { // this groups each experience's elements
        eachExp.push(jobList[job].value);
      } else {

        // Current at this Job?
        isChecked = jobList[job].checked ? true : false;

        /* Populate items in array into doc.write() */
        for (let m = 0; m < eachExp.length; m++) {
          switch (m) {
            case 0: //Title
              creatingWrite += eachExp[m];
              creatingWrite += "</p><p>";
              break;
            case 1: //Occupation
              creatingWrite += eachExp[m];
              creatingWrite += " | ";
              break;
            case 2: //Start
              eachExp[m] = convertDate(eachExp[m]);
              creatingWrite += eachExp[m];
              creatingWrite += "-";
              break;
            case 3: //End
              if (isChecked) {
                creatingWrite += "Current";
              } else {
                eachExp[m] = convertDate(eachExp[m]);
                creatingWrite += eachExp[m];
              }
              creatingWrite += "</p><br><p>";
              break;
            case 4: //Description
              creatingWrite += eachExp[m];
              creatingWrite += "<br><br></div>";
              break;
            default:
              console.log("error populating");
              break;
          }
        }

        eachExp.splice(0, eachExp.length); //clear the array to reuse and free memory
      }
      numOfJobs++;
    }

  }

  return creatingWrite;


}



function submitForm() {

if (doc.qs("#email").value == "") {
return;
}

  /* Concactenating all the pieces for inline html */
  let creatingWrite = "<!DOCTYPE html>";

  /* Copying all values of the submission form to insert into resume build */
  creatingWrite += setPersonal(creatingWrite) +
    setTechnical(creatingWrite) +
    setSkillSet(creatingWrite) +
    setName(creatingWrite) +
    setEducation(creatingWrite) +
    setExperience(creatingWrite);

  /* Creating new window */
  let win = window.open("", 'myPop', 'width=400,height=200,left=200,top=200');


  //add document.write() of resume output after injecting configurable variables
  win.document.write(creatingWrite);

}

// Converts default date format into MM/dd/YYYY
// Dates values not filled will result in "No input"
function convertDate(thisDate) {
  if (thisDate != "") {
    let newDate = new Date(thisDate);
    let d = newDate.getDate() + 1;
    let m = newDate.getMonth() + 1;
    let y = newDate.getYear() + 1900;
    newDate = m + "/" + d + "/" + y;

    return newDate
  } else {
    return "No Input.";
  }

}

// Action when "Create Resume" button has been triggered
doc.qs("#submitForm").addEventListener("click", submitForm);




//Cause the Name input field to be automatically selected so user can begin typing immediately
window.onload = function() {
    document.getElementById('name').focus()
}

//Allow user to input text into #other-job-role field if they select "Other" in Job Role dropdown
function hideJobRole(){
    let jobTitle = document.getElementById('title').value
    let otherJob = document.getElementById('other-job-role')
    otherJob.style.display = "none"
    jobTitle.addEventListener("change", () => {
        if (jobTitle.value === "other") {
            otherJob.style.display = "block"
        } else {
            otherJob.style.display = "none"
        }
    })
}
hideJobRole()
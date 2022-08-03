//Detail service note
var detailServiceNoteModal = document.getElementById("detail-service-note-modal");
detailServiceNoteModal.addEventListener("show.bs.modal", function (event) {

    var button = event.relatedTarget;

    var dataFirstName = button.getAttribute("data-first-name");
    var dataLastName = button.getAttribute("data-last-name");
    var dataStatus = button.getAttribute("data-status");
    var dataSchedule = button.getAttribute("data-schedule");
    var dataService = button.getAttribute("data-service");
    var dataPrice = button.getAttribute("data-price");
    var dataCreateName = button.getAttribute("data-create-name");
    var dataRecept = button.getAttribute("data-recept");
    var dataPerformer = button.getAttribute("data-performer");


    var name = document.getElementById("detail-service-note-name");
    var status = document.getElementById("detail-service-note-status");
    var schedule = document.getElementById("detail-service-note-schedule");
    var service = document.getElementById("detail-service-note-service");
    var price = document.getElementById("detail-service-note-price");
    var createName = document.getElementById("detail-service-note-createName");
    var recept = document.getElementById("detail-service-note-reception");
    var performer = document.getElementById("detail-service-note-doctor");

    name.innerHTML = dataFirstName +" "+ dataLastName;
    status.innerHTML = dataStatus;
    schedule.innerHTML =dataSchedule
    service.innerHTML = dataService;
    price.innerHTML = dataPrice + ' VND';
    createName.innerHTML = dataCreateName ;
    recept.innerHTML = dataRecept;
    performer.innerHTML = dataPerformer;
 
   
})




//END Detail service note
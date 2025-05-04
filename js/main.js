window.onload = function () {
    addTopic();
    loadResponses();
  
    fetchLikeCount("fermat-likes", "https://ff0fnmu6n5.execute-api.us-east-2.amazonaws.com/items/fermat-likes");
    fetchLikeCount("induction-likes", "https://ff0fnmu6n5.execute-api.us-east-2.amazonaws.com/items/induction-likes");
    fetchLikeCount("integrals-likes", "https://ff0fnmu6n5.execute-api.us-east-2.amazonaws.com/items/integrals-likes");
    fetchLikeCount("rational-likes", "https://ff0fnmu6n5.execute-api.us-east-2.amazonaws.com/items/rational-likes");
    fetchLikeCount("combinatorics-likes", "https://ff0fnmu6n5.execute-api.us-east-2.amazonaws.com/items/combinatorics-likes");
    fetchLikeCount("imaginary-likes", "https://ff0fnmu6n5.execute-api.us-east-2.amazonaws.com/items/imaginary-likes");
  };

function fetchLikeCount(id, endpoint) {
    document.addEventListener("DOMContentLoaded", function () {
      const counter = document.getElementById(id);
      if (!counter) return;
      const xhr = new XMLHttpRequest();
      xhr.open("GET", endpoint);
      xhr.onload = function () {
        const data = JSON.parse(xhr.responseText);
        const count = data.count;
        counter.textContent = count || 0;
      };
      xhr.send();
    });
  }

function addTopic() {
    document.getElementById("addTopic").onclick = function () {
        let xhr = new XMLHttpRequest(); 
        xhr.open("PUT", "https://ff0fnmu6n5.execute-api.us-east-2.amazonaws.com/suggestions");
        xhr.setRequestHeader("Content-Type", "application/json"); 
        let form = document.getElementById("SuggestionBox"); 
        let id = `item-${Date.now()}`; 
        let topic = form.elements["topic"].value; 
        let concept = form.elements["concept"].value; 
        xhr.send(JSON.stringify({
          "id": id, 
          "topic": topic, 
          "concept": concept
        })); 
        loadResponses(); 
        form.reset(); 
      };
}

function loadResponses() {
    let xhr = new XMLHttpRequest(); 
    xhr.open("GET", "https://ff0fnmu6n5.execute-api.us-east-2.amazonaws.com/suggestions");
    xhr.onload = function () {
      let items = JSON.parse(xhr.responseText); 
      let tableBody = document.getElementById("responses").getElementsByTagName("tbody")[0]; 
      tableBody.innerHTML = "";
      items.forEach(item => {
        let row = document.createElement("tr"); 

        let topicCell = document.createElement("td"); 
        topicCell.textContent = item.topic; 
        row.appendChild(topicCell); 

        let conceptCell = document.createElement("td"); 
        conceptCell.textContent = item.concept; 
        row.appendChild(conceptCell); 

        let actionCell = document.createElement("td"); 

        let deleteButton = document.createElement("button"); 
        deleteButton.textContent = "delete"
        deleteButton.onclick = function() {
          deleteItem(item.id); 
        }
        actionCell.appendChild(deleteButton); 
        row.appendChild(actionCell); 
        tableBody.appendChild(row);  
    });
    }
  xhr.send(); 
  };

  function deleteItem(itemId) {
    let xhr = new XMLHttpRequest(); 
    xhr.open("DELETE", `https://ff0fnmu6n5.execute-api.us-east-2.amazonaws.com/suggestions/${itemId}`);
    xhr.setRequestHeader("Content-Type", "application/json"); 
    xhr.onload = function() {
      loadResponses(); 
    };
    xhr.send(); 
  }

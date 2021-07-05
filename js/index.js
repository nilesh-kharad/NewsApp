console.log("hello");
let accordion = document.querySelector(".accordion");
let sources = 'world';
function source() {
    let A = document.querySelector("#searchforsource").value;
    sources = A;
    console.log("A", A);
    console.log("sources", sources);
    myFunction();
}
function myFunction(){
    console.log("sources", sources);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://newsapi.org/v2/everything?q=${sources}&apiKey=ec6b60c2fe0340fbbceab5af29568ee2`, true);
    let newshtml = "";
    let textcolor = 10;
    if(textcolor%2==0){
        accordion.style.color = "blue";
    }else{
        accordion.style.color = "black";
    }
    textcolor +=1;
    xhr.onload = function () {
        if (this.status === 200) {
            let json = JSON.parse(this.responseText);
            let articles = json.articles;
            articles.forEach(function (elements, index) {
                let news = `<div class="card">
                            <div class="card-header" id="heading${index}">
                                <h5 class="mb-0 overflow-hidden">
                                    <button class=" btn btn-link collapsed" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                                            <div class="overflow-hidden">
                                            Breaking News ${index + 1}: ${elements['title']}
                                            </div>
                                    </button>
                                </h5>
                            </div>

                            <div id="collapse${index}" class="collapse mb-0" aria-labelledby="heading${index}" data-parent=".accordion">
                                <div class="card-body">                               
                                      <img class="rounded mx-auto d-block" src="${elements['urlToImage']}" alt="Img." width="250px"><hr>
                                      ${elements['content']}. <a href="${elements['url']}" target="_blank">Read more here...</a>
                                  </div>
                            </div>
                        </div>`;
                newshtml += news;

            });
            accordion.innerHTML = newshtml;

        } else {
            console.log("some err");
        }
    }
    xhr.send()
}


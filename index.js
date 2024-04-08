console.log('test')

// events
let findCountryForm = document.getElementById('find-country-form');
findCountryForm.addEventListener('submit', e => findCountry(e))

// event listener to get data
function findCountry(e) {
    e.preventDefault();
    let countryName = document.getElementById('countryInput').value;
    console.log(`looking for country named ${countryName}`)
    const url = ` https://restcountries.com/v3.1/name/${countryName}`
    fetch(url)
        .then( res => res.json() )
        .then( data => displayCountry(data) )
        .catch( err => console.error(err) )
}

// Callback function to accept data and display header
function displayCountry(data){
    let table = document.getElementById('country-table')
    // clear table
    table.innerHTML = '';
    // incase no country is put in
    if (!data.length){
        table.innerHTML = '<h1>No Country with that name</h1>'
    }
    // set up table
    const thead = document.createElement('thead');
    table.append(thead);
    let tr = document.createElement('tr');
    thead.append(tr);
    const tableHeadings = ['Name', 'Official Name', 'Currencies', 'Capital', 'Languages'];
    tableHeadings.forEach( heading => {
        let th = document.createElement('th')
        th.scope = 'col';
        th.innerHTML = heading;
        tr.append(th)
    })
    const myImgHolder = document.createElement('div');
    myImgHolder.setAttribute("id", "myImgHolder");
    myImgHolder.setAttribute("alt", "Flag")
    myImgHolder.setAttribute("class", "mw-50")
    document.getElementById('flag-img').appendChild(myImgHolder);

    // Create body 
    let tbody = document.createElement('tbody');
    table.append(tbody);

    for (let country of data){
        let tr = document.createElement('tr');
        tbody.append(tr);
        newDataCell(tr, country.name.common)
        newDataCell(tr, country.name.official)
        newDataCell(tr, Object.values(country.currencies).map(currency => currency.name).join(', '))
        newDataCell(tr, country.capital)
        newDataCell(tr, Object.values(country.languages).join(', '))
    }

    var myImages = '';
    for(let country of data){
        myImages += `<img src=${country.flags.svg} style="width: 300px;">`;
    }
    document.getElementById('myImgHolder').innerHTML = myImages;
}

function newDataCell(tr, value){
    let td = document.createElement('td');
    td.innerHTML = value ?? '-'
    tr.append(td)
}




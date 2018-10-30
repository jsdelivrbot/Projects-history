const Elements = function (elementProperties) {
    this.elementProperties = elementProperties;
    this.elementsState = [];
    this.elementsMutatedState = [];
};

let statistic = [];

const showStatistic = () => {
    statistic.map(function (div) {
        console.log("Statistic for %s, clicks: %s, overs: %s ", div.id, div.clicks, div.overs);
    });
};

const deleteFirstChild = (id) => {
    let elem = document.getElementById(id);
    while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
    }
};

Elements.prototype.renderElement = function renderElement (element) {

    if (!element.html.element) {
        return;
    }
    let newDiv = document.createElement(element.html.element);

    let elementForStatistic = {
        id: element.id,
        clicks: 0,
        overs: 0
    };

    let result = statistic.filter(function( element ){
        return  element.id == elementForStatistic.id;
    });

    if( result[0] === undefined) {
        statistic.push(elementForStatistic);
    }
    newDiv.name=element.id;

    if (element.html.value !== undefined) {
        newDiv.value = element.html.value;
    }
    if (element.html.type !== undefined) {
        newDiv.type = element.html.type;
    }
    if (element.html.handlers.onclick !== undefined) {
        newDiv.onclick = element.html.handlers.onclick;
    }
    if (element.html.handlers.onMouseOver !== undefined) {
        newDiv.onmouseover = element.html.handlers.onMouseOver;
    }
    if (element.html.className !== undefined) {
        newDiv.className = element.html.className;
    }
    if (element.html.innerHTML !== undefined) {
        newDiv.innerHTML = element.html.innerHTML;
    }
    if (element.mutableProperties !== undefined && element.mutableProperties.color !== undefined && element.mutableProperties.color.current !== undefined) {
        newDiv.style.backgroundColor = element.mutableProperties.color.current;
    }

    let elem = document.getElementById(element.id);
    elem.appendChild(newDiv);

};

 Elements.prototype.renderElements = function renderElements () {
                const that = this;
                this.elementProperties.map(function (element) {
                    let checkElementExpirationTime = (Date.now() > element.start_time && Date.now() < element.end_time) && !that.elementsState[element.id];
                    if (checkElementExpirationTime) {
                        that.elementsState[element.id] = true;
                        that.elementsMutatedState[element.id] = false;
                    elements.renderElement(element);
                }
                let checkMutation = element.mutableProperties !== undefined &&
                    element.mutableProperties.color !== undefined &&
                    element.mutableProperties.color.current !== undefined &&
                    (Date.now() > element.mutableProperties.color.start_time &&
                     Date.now() < element.mutableProperties.color.end_time) &&
                    !that.elementsMutatedState[element.id];

                    if ( checkMutation ) {
                        deleteFirstChild (element.id);
                        that.elementsMutatedState[element.id] = true;
                        let newElement = element;
                        newElement.mutableProperties.color.current = newElement.mutableProperties.color.new;
                        elements.renderElement(newElement);
                }

                if (  Date.now() > element.end_time ) {
                    deleteFirstChild (element.id);
                }
            });
        };

window.Elements = Elements;
let elements = new Elements(window.elementProperties);

setInterval(() => {
    elements.renderElements();
}, 500);


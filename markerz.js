// the main application object
adcElemento = function () {
    var Panorama = rPanorama;
    var Name = []
    const rul = ["--", "0 [cm]"]

    Name[0] = JSON.stringify(Object.values(rPanoramas[ntimes])[1]).substring(1, 11) +
        Panorama.getPano() + "A"
    Name[1] = JSON.stringify(Object.values(rPanoramas[ntimes])[1]).substring(1, 11) +
        Panorama.getPano() + "B"

    if (Panorama.__gm.panes.overlayLayer.children[Name[1]] == undefined || Math.abs(Panorama.__gm.panes.overlayLayer.children.length % 2) == 1) {
        
       
        
        SVO.panWidth = Object.values(rMap.__gm.pixelBounds)[2] - Object.values(rMap.__gm.pixelBounds)[0];
        SVO.panHeight = Object.values(rMap.__gm.pixelBounds)[3] - Object.values(rMap.__gm.pixelBounds)[1];
        SVO.markerWidth = 18;
        SVO.markerHeight = 18;

        if (!eid("centroR")) {
            astorPlace = {
                lat: rPanorama.position.lat(),
                lng: rPanorama.position.lng(),
            };

            var divNova = document.createElement("i");
            divNova.id = "centroR"
            divNova.style.position = "absolute"
            divNova.style.top = (SVO.panHeight - SVO.markerWidth) / 2 + "px"
            divNova.style.left = (SVO.panWidth - SVO.markerWidth) / 2 + "px"
            divNova.style.fontSize = SVO.markerWidth + "px"
            divNova.style.color = "red"
            divNova.classList.add('fa', 'fa-plus-circle')
            Panorama.__gm.panes.overlayImage.appendChild(divNova)
        }
        else {

            if (Panorama.__gm.panes.overlayLayer.children[Name[0]] == undefined) {
                ii = 0
                Dates.add(JSON.stringify(Object.values(rPanoramas[ntimes])[1]).substring(1, 11))

            }
            if (Panorama.__gm.panes.overlayLayer.children[Name[1]] == undefined) { ii = 1 }


            var divNova = document.createElement("i");
            divNova.id = Name[ii]
            divNova.style.position = "absolute"
            divNova.style.top = (SVO.panHeight - SVO.markerHeight) / 2 + "px"
            divNova.style.left = (SVO.panWidth - SVO.markerWidth) / 2 + "px"
            divNova.style.fontSize = SVO.markerWidth + "px"
            divNova.style.color = "red"

            divNova.sheading = Panorama.getPov().heading;
            divNova.spitch = Panorama.getPov().pitch;
            divNova.cPosition = cartesian(Panorama.position.lat(), Panorama.position.lng())

            divNova.classList.add('fa', 'fa-dot-circle-o')
            var conteudoNovo = document.createTextNode(rul[ii]);
            divNova.appendChild(conteudoNovo);
            Panorama.__gm.panes.overlayLayer.appendChild(divNova);
            dragElement(eid(Name[ii]));


            Panorama.addListener('pov_changed', function () {
                SVO.panWidth = Object.values(rMap.__gm.pixelBounds)[2] - Object.values(rMap.__gm.pixelBounds)[0];
                SVO.panHeight = Object.values(rMap.__gm.pixelBounds)[3] - Object.values(rMap.__gm.pixelBounds)[1];
                var neime = JSON.stringify(Object.values(rPanoramas[ntimes])[1]).substring(1, 11) +
                    this.getPano()

                if ((this.__gm.panes.overlayLayer.children[neime + "A"])) {
                    m_updateMarker(eid(neime + "A"), this.getPov())
                }
                if ((this.__gm.panes.overlayLayer.children[neime + "B"])) {
                    m_updateMarker(eid(neime + "B"), this.getPov())
                }
            });

            Panorama.addListener('pano_changed', function () {
                let ii
                SVO.panWidth = Object.values(rMap.__gm.pixelBounds)[2] - Object.values(rMap.__gm.pixelBounds)[0];
                SVO.panHeight = Object.values(rMap.__gm.pixelBounds)[3] - Object.values(rMap.__gm.pixelBounds)[1];
                var neime = JSON.stringify(Object.values(rPanoramas[ntimes])[1]).substring(1, 11) +
                    this.getPano()

                if ((this.__gm.panes.overlayLayer.children[neime + "A"])) {
                    m_updateMarker(eid(neime + "A"), this.getPov())
                }
                if ((this.__gm.panes.overlayLayer.children[neime + "B"])) {
                    m_updateMarker(eid(neime + "B"), this.getPov())
                }
                if (this.__gm.panes.overlayLayer.children.length > 0) {
                    for (kk = 0; kk < this.__gm.panes.overlayLayer.children.length / 2; kk++) {
                        this.__gm.panes.overlayLayer.children[2 * kk].style.display = neime + "A" ==
                            this.__gm.panes.overlayLayer.children[2 * kk] ? "block" : "none";
                        this.__gm.panes.overlayLayer.children[2 * kk + 1].style.display = neime + "B" ==
                            this.__gm.panes.overlayLayer.children[2 * kk + 1] ? "block" : "none";
                    }
                }
            });
        }
    } else {
        Panorama.__gm.panes.overlayLayer.children[Name[1]].remove();
        Panorama.__gm.panes.overlayLayer.children[Name[0]].remove();
    }
     if (rPanorama.__gm.panes.overlayLayer.children.length > 2 && !popupOriginal && Math.abs(rPanorama.__gm.panes.overlayLayer.children.length % 2) == 0) {
            slt = solverH(rPanorama.__gm.panes.overlayLayer.children);
            for (ii = 0; ii < rPanorama.__gm.panes.overlayLayer.children.length / 2; ii++) {
                rPanorama.__gm.panes.overlayLayer.children[2 * ii].innerText = '0 [cm] ';

            rPanorama.__gm.panes.overlayLayer.children[2 * ii + 1].innerText = '\n Altura: ' + String(parseFloat(slt[0]).toFixed(1)) + ' (σ=' + String(parseFloat(slt[1]).toFixed(1)) + ')' + '\n Afastamento: ' + String(parseFloat(slt[2]).toFixed(1)) + ' (σ=' + String(parseFloat(slt[3]).toFixed(1)) + ')' + ' \n Distância: ' + String(parseFloat(slt[4]).toFixed(1)) + ' (σ=' + String(parseFloat(slt[5]).toFixed(1)) + ')';
            }
        }
}


adcElementoT = function () {

    var oPanorama = []

    oPanorama[0] = rPanorama;
    oPanorama[1] = pPanorama;

    SVO.panWidth = Object.values(rMap.__gm.pixelBounds)[2] - Object.values(rMap.__gm.pixelBounds)[0];
    SVO.panHeight = Object.values(rMap.__gm.pixelBounds)[3] - Object.values(rMap.__gm.pixelBounds)[1];
    SVO.markerWidth = 15;
    SVO.markerHeight = 15;

    if (!eid("centroR")) {
        var divNova = document.createElement("i");
        divNova.id = "centroR"
        divNova.style.position = "absolute"
        divNova.style.top = (SVO.panHeight - SVO.markerWidth) / 2 + "px"
        divNova.style.left = (SVO.panWidth - SVO.markerWidth) / 2 + "px"
        divNova.style.fontSize = SVO.markerWidth + "px"
        divNova.style.color = "red"
        divNova.classList.add('fa', 'fa-plus-circle')

        rPanorama.__gm.panes.overlayImage.appendChild(divNova)
        if (!eid("centroP")) {
            var divNova = document.createElement("i");
            divNova.id = "centroP"
            divNova.style.position = "absolute"
            divNova.style.top = (SVO.panHeight - SVO.markerWidth) / 2 + "px"
            divNova.style.left = (SVO.panWidth - SVO.markerWidth) / 2 + "px"
            divNova.style.fontSize = SVO.markerWidth + "px"
            divNova.style.color = "red"
            divNova.classList.add('fa', 'fa-plus-circle')
            pPanorama.__gm.panes.overlayImage.appendChild(divNova)
        }

    }

    for (ii = 0; ii < 2; ii++) {

        Panorama = oPanorama[ii];
        var rul = "P"
        Name = Panorama.getPano() + rul

        var divNova = document.createElement("i");
        divNova.id = Name
        divNova.style.position = "absolute"
        divNova.style.top = (SVO.panHeight - SVO.markerHeight) / 2 + "px"
        divNova.style.left = (SVO.panWidth - SVO.markerWidth) / 2 + "px"
        divNova.style.fontSize = SVO.markerWidth + "px"
        divNova.style.color = "red"

        divNova.sheading = Panorama.getPov().heading;
        divNova.spitch = Panorama.getPov().pitch;
        // divNova.cPosition = cartesian(Panorama.position.lat(), Panorama.position.lng())

        divNova.gPosition = Panorama.position
        divNova.pano = Panorama.pano
        //divNova.day = JSON.stringify(Object.values(rPanoramas[ntimes])[1]).substring(1, 11)


        divNova.classList.add('fa', 'fa-dot-circle-o')
        var conteudoNovo = document.createTextNode("P");
        divNova.appendChild(conteudoNovo);
        Panorama.__gm.panes.overlayLayer.appendChild(divNova);

        dragElement(eid(Name), Panorama.getPov());



        Panorama.addListener('pov_changed', function () {
            SVO.panWidth = Object.values(rMap.__gm.pixelBounds)[2] - Object.values(rMap.__gm.pixelBounds)[0];
            SVO.panHeight = Object.values(rMap.__gm.pixelBounds)[3] - Object.values(rMap.__gm.pixelBounds)[1];

            for (let jj = 0; jj <= this.__gm.panes.overlayLayer.children.length; jj++) {

                numb = String(jj)
                ru = ["P" + numb]
                if ((this.__gm.panes.overlayLayer.children[this.getPano() + ru]) &&
                    popupOriginal.document.all[combineStringsCommutative(rPanorama.getPano(), pPanorama.getPano()) + "Q" + String(jj)]) {
                    m_updateMarker(eid(this.getPano() + ru), this.getPov())
                }
            }

        });


        Panorama.addListener('pano_changed', function () {
            SVO.panWidth = Object.values(rMap.__gm.pixelBounds)[2] - Object.values(rMap.__gm.pixelBounds)[0];
            SVO.panHeight = Object.values(rMap.__gm.pixelBounds)[3] - Object.values(rMap.__gm.pixelBounds)[1];

            for (kk = 0; kk < rPanorama.__gm.panes.overlayLayer.children.length; kk++) {
                if (rPanorama.__gm.panes.overlayLayer.children[kk]) {
                    rPanorama.__gm.panes.overlayLayer.children[kk].style.display = "none";
                }
            }
            for (kk = 0; kk < pPanorama.__gm.panes.overlayLayer.children.length; kk++) {
                if (pPanorama.__gm.panes.overlayLayer.children[kk]) {
                    pPanorama.__gm.panes.overlayLayer.children[kk].style.display = "none";
                }
            }


            for (kk = 0; kk < popupOriginal.document.all.length - 8 - 2 * window._marcadoresPLinhasCount; kk++) {

                numb = String(kk)
                ru = ["P" + numb]
                if (rPanorama.__gm.panes.overlayLayer.children[kk]) {
                    rPanorama.__gm.panes.overlayLayer.children[kk].style.display = "none";
                }
                if (pPanorama.__gm.panes.overlayLayer.children[kk]) {
                    pPanorama.__gm.panes.overlayLayer.children[kk].style.display = "none";
                }

                if (rPanorama.__gm.panes.overlayLayer.children[this.getPano() + ru]) {
                    this.__gm.panes.overlayLayer.appendChild(rPanorama.__gm.panes.overlayLayer.children[this.getPano() + ru])
                }
                if (pPanorama.__gm.panes.overlayLayer.children[this.getPano() + ru]) {
                    this.__gm.panes.overlayLayer.appendChild(pPanorama.__gm.panes.overlayLayer.children[this.getPano() + ru])
                }
            }

        });
    }
    if (popupOriginal) {
        solverP()
    }
}

adcElementoC = function () {

    var oPanorama = []
    numb = String(popupOriginal.document.all.length - 8)

    oPanorama[0] = rPanorama;
    oPanorama[1] = pPanorama;

    SVO.panWidth = Object.values(rMap.__gm.pixelBounds)[2] - Object.values(rMap.__gm.pixelBounds)[0];
    SVO.panHeight = Object.values(rMap.__gm.pixelBounds)[3] - Object.values(rMap.__gm.pixelBounds)[1];
    SVO.markerWidth = 15;
    SVO.markerHeight = 15;

    if (!eid("centroR")) {
        var divNova = document.createElement("i");
        divNova.id = "centroR"
        divNova.style.position = "absolute"
        divNova.style.top = (SVO.panHeight - SVO.markerWidth) / 2 + "px"
        divNova.style.left = (SVO.panWidth - SVO.markerWidth) / 2 + "px"
        divNova.style.fontSize = SVO.markerWidth + "px"
        divNova.style.color = "red"
        divNova.classList.add('fa', 'fa-plus-circle')

        rPanorama.__gm.panes.overlayImage.appendChild(divNova)
        if (!eid("centroP")) {
            var divNova = document.createElement("i");
            divNova.id = "centroP"
            divNova.style.position = "absolute"
            divNova.style.top = (SVO.panHeight - SVO.markerWidth) / 2 + "px"
            divNova.style.left = (SVO.panWidth - SVO.markerWidth) / 2 + "px"
            divNova.style.fontSize = SVO.markerWidth + "px"
            divNova.style.color = "red"
            divNova.classList.add('fa', 'fa-plus-circle')
            pPanorama.__gm.panes.overlayImage.appendChild(divNova)
        }

    }
    NameQ = combineStringsCommutative(rPanorama.getPano(), pPanorama.getPano())

    numbL = countElementsByIdPrefix(popupOriginal.document, NameQ);

    var divNova = document.createElement("i");
    divNova.id = NameQ + "Q" + numb;
    divNova.IDz = NameQ
    divNova.IDs = numb;
    divNova.style.position = "absolute"
    divNova.style.top = "50%"
    divNova.style.left = "50%"
    divNova.style.zIndex = "10";
    divNova.style.fontSize = popupOriginal.document.getElementById("image-original").children.image.height/40 + "px"
    divNova.style.color = "red"
    divNova.classList.add('fa', 'fa-dot-circle-o', 'marker')
    divNova.onclick = function () {
        const id = this.id;
        window._marcadoresPContagem[id] = (window._marcadoresPContagem[id] || 0) + 1;

        // Adiciona marcador se ainda não está na lista
        if (!window._marcadoresPSelecionados.includes(this)) {
            window._marcadoresPSelecionados.push(this);
        }

        // Se dois marcadores diferentes foram clicados duas vezes cada
        if (
            window._marcadoresPSelecionados.length === 2 &&
            window._marcadoresPContagem[window._marcadoresPSelecionados[0].id] >= 2 &&
            window._marcadoresPContagem[window._marcadoresPSelecionados[1].id] >= 2
        ) {
            desenhaRetaEntreMarcadoresP(window._marcadoresPSelecionados[0], window._marcadoresPSelecionados[1]);
            // Adiciona listeners para atualizar a linha ao mover os marcadores
            window._marcadoresPSelecionados.forEach(marker => {
                marker._updateLineP = function () {
                    desenhaRetaEntreMarcadoresP(window._marcadoresPSelecionados[0], window._marcadoresPSelecionados[1]);
                };
                marker.addEventListener('mouseup', marker._updateLineP);
            });
            // Limpa seleção para novo par
            window._marcadoresPSelecionados = [];
            window._marcadoresPContagem = {};
        }
    };

    var conteudoNovo = popupOriginal.document.createTextNode("Q" + numbL);
    divNova.appendChild(conteudoNovo);
    popupOriginal.document.getElementById("image-original").appendChild(divNova);
    dragElement(popupOriginal.document.getElementById(NameQ + "Q" + numb), rPanorama.getPov())

    for (ii = 0; ii < 2; ii++) {

        Panorama = oPanorama[ii];
        var rul = "P" + numb
        Name = Panorama.getPano() + rul

        var divNova = document.createElement("i");
        divNova.id = Name
        divNova.style.position = "absolute"
        divNova.style.top = (SVO.panHeight - SVO.markerHeight) / 2 + "px"
        divNova.style.left = (SVO.panWidth - SVO.markerWidth) / 2 + "px"
        divNova.style.fontSize = SVO.markerWidth + "px"
        divNova.style.color = "red"

        divNova.sheading = Panorama.getPov().heading;
        divNova.spitch = Panorama.getPov().pitch;
        // divNova.cPosition = cartesian(Panorama.position.lat(), Panorama.position.lng())

        divNova.gPosition = Panorama.position
        divNova.pano = Panorama.pano
        //divNova.day = JSON.stringify(Object.values(rPanoramas[ntimes])[1]).substring(1, 11)


        divNova.classList.add('fa', 'fa-dot-circle-o')
        var conteudoNovo = document.createTextNode("P" + numbL);
        divNova.appendChild(conteudoNovo);
        Panorama.__gm.panes.overlayLayer.appendChild(divNova);

        dragElement(eid(Name), Panorama.getPov());



        Panorama.addListener('pov_changed', function () {
            SVO.panWidth = Object.values(rMap.__gm.pixelBounds)[2] - Object.values(rMap.__gm.pixelBounds)[0];
            SVO.panHeight = Object.values(rMap.__gm.pixelBounds)[3] - Object.values(rMap.__gm.pixelBounds)[1];

            for (let jj = 0; jj <= this.__gm.panes.overlayLayer.children.length; jj++) {

                numb = String(jj)
                ru = ["P" + numb]
                if ((this.__gm.panes.overlayLayer.children[this.getPano() + ru]) &&
                    popupOriginal.document.all[combineStringsCommutative(rPanorama.getPano(), pPanorama.getPano()) + "Q" + String(jj)]) {
                    m_updateMarker(eid(this.getPano() + ru), this.getPov())
                }
            }

        });


        Panorama.addListener('pano_changed', function () {
            SVO.panWidth = Object.values(rMap.__gm.pixelBounds)[2] - Object.values(rMap.__gm.pixelBounds)[0];
            SVO.panHeight = Object.values(rMap.__gm.pixelBounds)[3] - Object.values(rMap.__gm.pixelBounds)[1];

            for (kk = 0; kk < rPanorama.__gm.panes.overlayLayer.children.length; kk++) {
                if (rPanorama.__gm.panes.overlayLayer.children[kk]) {
                    rPanorama.__gm.panes.overlayLayer.children[kk].style.display = "none";
                }
            }
            for (kk = 0; kk < pPanorama.__gm.panes.overlayLayer.children.length; kk++) {
                if (pPanorama.__gm.panes.overlayLayer.children[kk]) {
                    pPanorama.__gm.panes.overlayLayer.children[kk].style.display = "none";
                }
            }


            for (kk = 0; kk < popupOriginal.document.all.length - 8 - 2 * window._marcadoresPLinhasCount; kk++) {

                numb = String(kk)
                ru = ["P" + numb]
                if (rPanorama.__gm.panes.overlayLayer.children[kk]) {
                    rPanorama.__gm.panes.overlayLayer.children[kk].style.display = "none";
                }
                if (pPanorama.__gm.panes.overlayLayer.children[kk]) {
                    pPanorama.__gm.panes.overlayLayer.children[kk].style.display = "none";
                }

                if (rPanorama.__gm.panes.overlayLayer.children[this.getPano() + ru]) {
                    this.__gm.panes.overlayLayer.appendChild(rPanorama.__gm.panes.overlayLayer.children[this.getPano() + ru])
                }
                if (pPanorama.__gm.panes.overlayLayer.children[this.getPano() + ru]) {
                    this.__gm.panes.overlayLayer.appendChild(pPanorama.__gm.panes.overlayLayer.children[this.getPano() + ru])
                }


                if (popupOriginal.document.all[combineStringsCommutative(rPanorama.getPano(), pPanorama.getPano()) + "Q" + String(kk)]) {
                    popupOriginal.document.all[combineStringsCommutative(rPanorama.getPano(), pPanorama.getPano()) + "Q" + String(kk)].style.display = "block";
                    if (this.__gm.panes.overlayLayer.children[this.getPano() + ru]) {

                        this.__gm.panes.overlayLayer.children[this.getPano() + ru].style.display = "block";
                        m_updateMarker(eid(this.getPano() + ru), this.getPov())
                    }
                } else {
                    popupOriginal.document.all[8 + kk].style.display = "none";
                }


                //  this.__gm.panes.overlayLayer.children[kk].style.display = this.getPano() ==
                //    this.__gm.panes.overlayLayer.children[2 * kk] ? "block" : "none";
            }

        });
    }
    if (popupOriginal) {
        solverP()
    }
}


dragElement = function (elmnt) {
    var pos1 = 0
        , pos2 = 0
        , pos3 = 0
        , pos4 = 0;
    if (document.getElementById(elmnt.id)) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id).onmousedown = dragMouseDown;

    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        popupOriginal.document.getElementById(elmnt.id).onmousedown = dragMouseDown;
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
        if (popupOriginal) {
            popupOriginal.document.onmouseup = closeDragElement;
            popupOriginal.document.onmousemove = elementDrag;
        }

    }

    function elementDrag(e) {
        SVO.panWidth = Object.values(rMap.__gm.pixelBounds)[2] - Object.values(rMap.__gm.pixelBounds)[0];
        SVO.panHeight = Object.values(rMap.__gm.pixelBounds)[3] - Object.values(rMap.__gm.pixelBounds)[1];

        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        var l_pov

        if (SVO.panWidth > e.clientX) {
            l_pov = rPanorama.getPov()
        } else {
            l_pov = pPanorama.getPov()
        }

        var l_zoom = l_pov.zoom;

        // scale according to street view zoom level
        var l_adjustedZoom = 45 / Math.pow(1.5 + 0.5 * (1 / (1 + Math.exp((-l_zoom + 1) * 3))), 0.85 * (l_zoom - 1));
        //var l_adjustedZoom = 45/Math.pow(2 , (0.86*l_zoom-0.81));

        //var l_adjustedZoom= -0.2468*Math.pow(l_zoom,5)+2.4709*Math.pow(l_zoom,4)
        //-7.9271*Math.pow(l_zoom,3)+9.8120*Math.pow(l_zoom,2)-21.1090*l_zoom+62
        var l_fovAngle = 1 / (Math.tan((l_adjustedZoom) * Math.PI / 180));

        var l_midX = (SVO.panWidth) / 2;
        var l_midY = (SVO.panHeight) / 2;

        var l_diffHeading = 2 * (elmnt.offsetLeft - pos1 - l_midX + SVO.markerWidth / 2) / (SVO.panWidth);
        var l_diffPitch = 2 * (elmnt.offsetTop - pos2 - l_midY + SVO.markerHeight / 2) / (SVO.panWidth);

        elmnt.sheading = l_pov.heading + Math.atan(l_diffHeading / l_fovAngle) * 180 / Math.PI;
        elmnt.spitch = l_pov.pitch - Math.atan(l_diffPitch / l_fovAngle) * 180 / Math.PI;

        if (rPanorama.__gm.panes.overlayLayer.children.length > 2 && !popupOriginal && Math.abs(rPanorama.__gm.panes.overlayLayer.children.length % 2) == 0) {
            slt = solverH(rPanorama.__gm.panes.overlayLayer.children);
            for (ii = 0; ii < rPanorama.__gm.panes.overlayLayer.children.length / 2; ii++) {
                rPanorama.__gm.panes.overlayLayer.children[2 * ii].innerText = '0 [cm] ';

            rPanorama.__gm.panes.overlayLayer.children[2 * ii + 1].innerText = '\n Altura: ' + String(parseFloat(slt[0]).toFixed(1)) + ' (σ=' + String(parseFloat(slt[1]).toFixed(1)) + ')' + '\n Afastamento: ' + String(parseFloat(slt[2]).toFixed(1)) + ' (σ=' + String(parseFloat(slt[3]).toFixed(1)) + ')' + ' \n Distância: ' + String(parseFloat(slt[4]).toFixed(1)) + ' (σ=' + String(parseFloat(slt[5]).toFixed(1)) + ')';
            }
            
        } 
    }
    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        if (popupOriginal) {
            popupOriginal.document.onmouseup = null;
            popupOriginal.document.onmousemove = null;
            solverP()
        }
    }
}

// create the 'marker' (a div containing an image which can be clicked)

m_updateMarker = function (elmnt, l_pov) {
    SVO.panWidth = Object.values(rMap.__gm.pixelBounds)[2] - Object.values(rMap.__gm.pixelBounds)[0];
    SVO.panHeight = Object.values(rMap.__gm.pixelBounds)[3] - Object.values(rMap.__gm.pixelBounds)[1];

    if (l_pov) {
        var l_zoom = l_pov.zoom;

        // scale according to street view zoom level
        var l_adjustedZoom = 45 / Math.pow(1.5 + 0.5 * (1 / (1 + Math.exp((-l_zoom + 1) * 3))), 0.85 * (l_zoom - 1));

        var l_fovAngle = 1 / (Math.tan((l_adjustedZoom) * Math.PI / 180));

        var l_midX = SVO.panWidth / 2;
        var l_midY = SVO.panHeight / 2;

        var l_diffHeading = (normalizeAngle(l_pov.heading - elmnt.sheading)) * Math.PI / 180;
        var l_diffPitch = (normalizeAngle(l_pov.pitch - elmnt.spitch)) * Math.PI / 180

        // 5) Projeção cilíndrica (perspective)
        var cosdh = Math.cos(l_diffHeading);
        var cosdp = Math.cos(l_diffPitch);
       // var eps = 1e-6; // evita explosão perto de |dh| ~ 90°
    //if (Math.abs(cosdp) < eps) cosdp = (l_pov.pitch > 0 ? eps : -eps);

        l_diffHeading = (l_fovAngle) * (-Math.tan(l_diffHeading)/cosdp);

        l_diffPitch = (l_fovAngle) * (Math.tan(l_diffPitch)/cosdh);

        var x = l_midX + (l_diffHeading) * (SVO.panWidth) / 2 - SVO.markerWidth / 2;
        var y = l_midY + (l_diffPitch) * (SVO.panWidth) / 2 - SVO.markerHeight / 2;

        var l_markerDiv = elmnt;

        //l_markerDiv.style.display = "block";
        l_markerDiv.style.left = x + "px";
        l_markerDiv.style.top = y + "px";
        // hide marker when its beyond the maximum distance

        l_markerDiv.style.display = (45 / Math.pow(2, (l_zoom - 1))) > Math.abs(normalizeAngle(l_pov.heading - elmnt.sheading)) ? "block" : "none";
    }
}

// utils
function eid(id) {
    return document.getElementById(id);
}

function normalizeAngle(a) {
    while (a > 180) {
        a -= 360;
    }
    while (a < -180) {
        a += 360;
    }
    return a;
}


function combineStringsCommutative(str1, str2) {
    // Ordena as strings alfabeticamente para garantir que a ordem não importe
    const sorted = [str1, str2].sort();
    return sorted.join("&");
}

function countElementsByIdPrefix(container, prefix) {
    let count = 0;
    for (let i = 8; i < container.all.length; i++) {
        if (container.all[i].id && container.all[i].id.startsWith(prefix)) {
            count++;
        }
    }
    return count;
}

function splitStringsCommutative(combinedStr) {
    const parts = combinedStr.split("&");
    if (parts.length !== 2) {
        throw new Error("Formato inválido para splitStringsCommutative");
    }
    // Retorna as duas strings em ordem alfabética (como estavam na combinação)
    return { str1: parts[0], str2: parts[1] };
}

// Exemplo de uso:
// const { str1, str2 } = splitStringsCommutative("abc&def");
// console.log(str1, str2); // "abc" "def"

// Inicialize o array global para as linhas, se ainda não existir
if (!window._marcadoresPLinhasCount) window._marcadoresPLinhasCount = 0;

function desenhaRetaEntreMarcadoresP(m1, m2) {

    // Se já existe, não cria outro
    if (popupOriginal.document.getElementById(combineStringsCommutative(String(m1.IDs), String(m2.IDs))) == undefined) {
        const segmentId = combineStringsCommutative(String(m1.IDs), String(m2.IDs));
        const overlayLayer = m1.parentNode;
        const x1 = parseFloat(m1.style.left) + SVO.markerWidth / 4 - 1;
        const y1 = parseFloat(m1.style.top) + SVO.markerHeight / 4 - 1;
        const x2 = parseFloat(m2.style.left) + SVO.markerWidth / 4 - 1;
        const y2 = parseFloat(m2.style.top) + SVO.markerHeight / 4 - 1;

        const svgNS = "http://www.w3.org/2000/svg";
        let svg = document.createElementNS(svgNS, "svg");
        svg.id = segmentId;
        svg.classList.add("markerP-connection-line");
        svg.style.position = "absolute";
        svg.style.left = "0";
        svg.style.top = "0";
        svg.style.width = "100%";
        svg.style.height = "100%";
        svg.style.pointerEvents = "none";
        svg.style.zIndex = "1000";

        let line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        line.setAttribute("stroke", "blue");
        line.setAttribute("stroke-width", "2");

        svg.appendChild(line);
        overlayLayer.appendChild(svg);

        // Calcule o centro da linha
        const centerX = (x1 + x2) / 2;
        const centerY = (y1 + y2) / 2;

        // Crie o input com id único
        let input = document.createElement("input");
        input.type = "text";
        //input.value = "0";
        //input.id = segmentId + "-input";
        input.style.position = "absolute";
        input.style.left = (centerX - SVO.markerWidth / 2) + "px";
        input.style.top = (centerY - SVO.markerHeight / 2) + "px";
        input.style.width = 1.5 * SVO.markerWidth + "px";
        input.style.height = SVO.markerHeight + "px";
        input.style.fontSize = SVO.markerWidth / 2 + "px";
        input.style.zIndex = "1100";
        input.style.MozAppearance = "textfield";
        input.style.appearance = "textfield";
        input.style.WebkitAppearance = "none";
        input.style.textAlign = "center";

        overlayLayer.appendChild(input);

        // Atualize a posição do input ao mover os marcadores
        function updateInputPosition() {
            const nx1 = parseFloat(m1.style.left) + SVO.markerWidth / 4 - 1;
            const ny1 = parseFloat(m1.style.top) + SVO.markerHeight / 4 - 1;
            const nx2 = parseFloat(m2.style.left) + SVO.markerWidth / 4 - 1;
            const ny2 = parseFloat(m2.style.top) + SVO.markerHeight / 4 - 1;
            input.style.left = ((nx1 + nx2) / 2 - SVO.markerWidth / 2) + "px";
            input.style.top = ((ny1 + ny2) / 2 - SVO.markerHeight / 2) + "px";
            line.setAttribute("x1", nx1);
            line.setAttribute("y1", ny1);
            line.setAttribute("x2", nx2);
            line.setAttribute("y2", ny2);
        }
        m1.addEventListener('mouseup', updateInputPosition);
        m2.addEventListener('mouseup', updateInputPosition);

        // Após overlayLayer.appendChild(input);
        window._marcadoresPLinhasCount++;
    }
}
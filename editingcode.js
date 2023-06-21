 /*static management*/
 function unselectAllMenu(){
    if(modeFilters||modeText){
      saveHistory();
    }
    var element = document.getElementById("menu_draw").classList.remove("menu_item_selected");
    element = document.getElementById("menu_filters").classList.remove("menu_item_selected");
    element = document.getElementById("menu_forms").classList.remove("menu_item_selected");
    element = document.getElementById("menu_text").classList.remove("menu_item_selected");
    element = document.getElementById("menu_load").classList.remove("menu_item_selected");
    element = document.getElementById("menu_ai").classList.remove("menu_item_selected");
    document.getElementById("undoButton").disabled = false;
    document.getElementById("redoButton").disabled = false;
    document.getElementById("clearButton").disabled = false;
    modeDraw=false;
    modeFilters = false;
    modeForms = false;
    modeText = false;
    modeLoad = false;
    isDrawing=false;
    element=document.getElementById("tempcanvas");
    element.classList.add("left-100");
    element.classList.remove("left30");
    element=document.getElementById("cursercanvas");
    element.classList.add("left-100");
    element.classList.remove("left30");
    element=document.getElementById("canvas");
    element.classList.add("left30");
    element.classList.remove("left-100");
    element=document.getElementById("textcursor");
    element.hidden=true;
    resetFilters();
  }
  function unloadAllOptions(){
    var element = document.getElementById("opt_draw");
    element.hidden=true;
    element = document.getElementById("opt_filters");
    element.hidden=true;
    element = document.getElementById("opt_forms");
    element.hidden=true;
    element = document.getElementById("opt_text");
    element.hidden=true;
    element = document.getElementById("opt_load");
    element.hidden=true;
    element = document.getElementById("opt_ai");
    element.hidden=true;
  }
  function unloadAllInfo(){
    var element = document.getElementById("info_draw");
    element.hidden=true;
    element = document.getElementById("info_filters");
    element.hidden=true;
    element = document.getElementById("info_forms");
    element.hidden=true;
    element = document.getElementById("info_text");
    element.hidden=true;
    element = document.getElementById("info_load");
    element.hidden=true;
    element = document.getElementById("info_ai");
    element.hidden=true;
  }
  function selectMenuDraw(){
    unselectAllMenu();
    unloadAllOptions();
    unloadAllInfo();
    var element = document.getElementById("menu_draw");
    element.classList.add("menu_item_selected");
    element = document.getElementById("opt_draw");
    element.hidden=false;
    element = document.getElementById("info_draw");
    element.hidden=false;
    modeDraw=true;
  }
  function selectMenuFilters(){
    unselectAllMenu();
    unloadAllOptions();
    unloadAllInfo();
    var element = document.getElementById("menu_filters").classList.add("menu_item_selected");
    element = document.getElementById("opt_filters").hidden=false;
    element = document.getElementById("info_filters").hidden=false;
    document.getElementById("undoButton").disabled = true;
    document.getElementById("redoButton").disabled = true;
    document.getElementById("clearButton").disabled = true;
    tempCtx.clearRect(0,0,canvas.width,canvas.height);
    curserCtx.clearRect(0,0,canvas.width,canvas.height);
    curserCtx.drawImage(layers[currentLayerIndex],0,0);
    modeFilters=true;
  }
  function selectMenuFroms(){
    unselectAllMenu();
    unloadAllOptions();
    unloadAllInfo();
    var element = document.getElementById("menu_forms").classList.add("menu_item_selected");
    element = document.getElementById("opt_forms").hidden=false;
    element = document.getElementById("info_forms").hidden=false;
    element = document.getElementById("forms_line").hidden=false;
    modeForms = true;
  }
  function selectMenuText(){
    unselectAllMenu();
    unloadAllOptions();
    unloadAllInfo();
    drawTextCurser();
    var element = document.getElementById("menu_text").classList.add("menu_item_selected");
    element = document.getElementById("opt_text").hidden=false;
    element=document.getElementById("textcursor").hidden=false;
    element=document.getElementById("textinput").focus();
    modeText=true;
    element = document.getElementById("info_text");
    element.hidden=false;
  }
  function selectMenuLoad(){
    unselectAllMenu();
    unloadAllOptions();
    unloadAllInfo();
    var element = document.getElementById("menu_load");
    element.classList.add("menu_item_selected");
    element = document.getElementById("opt_load");
    element.hidden=false;
    element = document.getElementById("info_load");
    element.hidden=false;
    modeLoad=true;
  }
  function selectMenuAI(){
    unselectAllMenu();
    unloadAllOptions();
    unloadAllInfo();
    var element = document.getElementById("menu_ai");
    element.classList.add("menu_item_selected");
    element = document.getElementById("opt_ai");
    element.hidden=false;
    element = document.getElementById("info_ai");
    element.hidden=false;
    modeAi=true;
  }
/*-----------------here all functinsfor canvas begin------------------*/
  /*initialisation*/
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const tempCanvas= document.getElementById('tempcanvas');
    const tempCtx= tempCanvas.getContext('2d');
    const curserCanvas = document.getElementById('cursercanvas');
    const curserCtx=curserCanvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let curserX=0;
    let curserY=0;
    let brushSize = 10;
    let brushOpacity=255;
    let selectedColor = '#000000';
    let isRainbowMode = false;
    let isEraseMode=false;
    let isFillMode=false;
    let modeDraw=true;
    let modeFilters = false;
    let modeForms = false;
    let modeText = false;
    let modeLoad = false;
    let modeAi=false;
    let image;
    let mouse_Down=false;
    let selectedFont= "Arial";
    let selectedform="forms_line";
    let x = 50;
        let y = 50;
        let isResizing = false;
    let isrectangular = true;
    let clicks = [];
    let corners=f_pcorners.value;
    let forms_c1='#000000';
    let forms_c2='#000000';
    let form_type="o";
    let f_x2=0;
    let f_y2=0;
    let layers = [];
    let currentLayerIndex = 0;
    let layerHistory = [[]];
    let historyIndex = 0;
    let layernumber=0;
    let Ai_uses_left=3;

  /*consts*/
    const aimenubutton = document.getElementById('aimenubutton');
    const ai_input = document.getElementById('aitextinput');
    const layersContainer = document.getElementById('layers-container');
    const deleteLayerBtn = document.getElementById('delete-layer-btn');
    const mergeLayersBtn = document.getElementById('merge-layers-btn');
    const layerUpBtn = document.getElementById('layer-up-btn');
    const layerDownBtn = document.getElementById('layer-down-btn');
    const duplicateLayerBtn = document.getElementById('duplicate-layer-btn');
    const fontSelect = document.getElementById("font-select");
    const formSelect = document.getElementById("forms-select");
    const formtypeSelect = document.getElementById("forms-type-select");
    const clearButton = document.getElementById('clearButton');
    const undoBtn = document.getElementById('undoButton');
    const redoBtn = document.getElementById('redoButton');
    const colorPicker = document.getElementById('colorPicker');
    const colorPicker_f1 = document.getElementById('colorPicker_f1');
    const colorPicker_f2 = document.getElementById('colorPicker_f2');
    const colorPickerText = document.getElementById('colorPickerText');
    const standardColors = document.getElementById('standardColors');
    const standardColorsText = document.getElementById('standardColorsText');
    const brushSizeInput = document.getElementById('brushSize');
    const brushOpacityInput = document.getElementById('brushOpacity');
    const downloadButton = document.getElementById('downloadButton');
    const TextSizeSlider = document.getElementById("Textsize");
    const TextInput = document.getElementById("textinput");
    const hueSlider = document.getElementById("hue");
    const blurSlider = document.getElementById("blur");
    const contrastSlider = document.getElementById("contrast");
    const brightnessSlider = document.getElementById("brightness");
    const saturationSlider = document.getElementById("saturation");
    const showHideButton = document.getElementById("showHideButton");
    const sliderWrapper = document.getElementById("sliderWrapper");
    const exposureSlider = document.getElementById("exposure");
    const grayscaleSlider = document.getElementById("grayscale");
    const f_cornersSlider = document.getElementById("f_corners");
    const f_pcornersSlider = document.getElementById("f_pcorners");
    const invertSlider=document.getElementById("invert");
    const fill =document.getElementById("fill");
    const form_Line = document.getElementById("forms_line");
    const form_Tri = document.getElementById("forms_tri");
    const form_Rect = document.getElementById("forms_rect");
    const form_Circle = document.getElementById("forms_circle");
    const form_Elypse = document.getElementById("forms_elypse");
    const form_Anygon = document.getElementById("forms_anygon");
    const form_Polygon = document.getElementById("forms_polygon");
    const form_Heart = document.getElementById("forms_heart");
    const checkBox = document.getElementById("f_tri_bx");
    const aiIsEdit = document.getElementById("ai_is_edit");
    const imageUpload = document.getElementById('imageUpload');

  /*startfunctions*/
    createLayer();
    selectMenuDraw();

  /*eventlisterns*/
    document.getElementById('layer-select').addEventListener('change', switchLayer);
    document.getElementById('add-layer-btn').addEventListener('click', createLayer);
    duplicateLayerBtn.addEventListener('click', duplicateLayer);
    layerDownBtn.addEventListener('click', moveLayerDown);
    layerUpBtn.addEventListener('click', moveLayerUp);
    mergeLayersBtn.addEventListener('click', mergeLayers);
    deleteLayerBtn.addEventListener('click', deleteLayer);
    clearButton.addEventListener('click', clearCanvas);
    undoButton.addEventListener('click', undo);
    redoButton.addEventListener('click', redo);
    downloadButton.addEventListener('click', downloadCanvas);
    TextSizeSlider.addEventListener("input",drawTextCurser);
    exposureSlider.addEventListener("input", applyFilters);
    grayscaleSlider.addEventListener("input",applyFilters);
    invertSlider.addEventListener("input",applyFilters);
    hueSlider.addEventListener("input", applyFilters);
    blurSlider.addEventListener("input", applyFilters);
    contrastSlider.addEventListener("input", applyFilters);
    brightnessSlider.addEventListener("input", applyFilters);
    TextInput.addEventListener("input",drawTextCurser);
    saturationSlider.addEventListener("input", applyFilters);
    checkBox.addEventListener('change',function(){
      isrectangular=!isrectangular;
    });
    canvas.addEventListener('mousedown', (e) => {
      if(modeDraw){
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
        if(isFillMode){
          flood_fill(lastX,lastY,color_to_rgba(selectedColor));
        }
      }
      else if(modeForms){
        x= event.clientX - canvas.offsetLeft;
        y= event.clientY - canvas.offsetTop;
        isResizing = true;
        if(selectedform=="forms_anygon"){
          clicks.push({
          x: event.offsetX,
          y: event.offsetY
          });
          tempCtx.clearRect(0, 0, canvas.width, canvas.height);
          if(form_type=="f"){
            tempCtx.strokeStyle='#00000000';
            tempCtx.fillStyle =forms_c2;
          }
          else if(form_type=="o"){
            tempCtx.strokeStyle=forms_c1;
            tempCtx.fillStyle ='#00000000';
          }
          else if(form_type=="of"){
            tempCtx.strokeStyle=forms_c1;
            tempCtx.fillStyle =forms_c2;
          }
          tempCtx.lineWidth = 1;
          tempCtx.beginPath();
          tempCtx.moveTo(clicks[0].x, clicks[0].y);
          for(var i=1; i < clicks.length; i++) { 
            tempCtx.lineTo(clicks[i].x,clicks[i].y);
          }
          tempCtx.closePath();
          tempCtx.fill();
          tempCtx.stroke();
          ctx.clearRect(0, 0, canvas.width, canvas.height);
            layers.forEach((layer, index) => {
              const layerCtx = layer.getContext('2d');
              const layerCheckbox = document.querySelector(`#layer-${index}-checkbox`);
              if (layerCheckbox.checked) {
                if(index==currentLayerIndex){
                  layerCtx.clearRect(0, 0, canvas.width, canvas.height);
                  layerCtx.drawImage(tempCanvas,0,0);
                }
              }
            });
            const layerPreviewImage = document.querySelector(`#layer-${currentLayerIndex}-preview`);
              layerPreviewImage.src = layers[currentLayerIndex].toDataURL();
              drawCurrentCanvas();
          }
        }
      else  if(modeText){
        [lastX, lastY] = [e.offsetX, e.offsetY];
        [curserX,curserY]=[e.x,e.y];
        drawTextCurser(e);
        mouse_Down=true;
      }
    });
    canvas.addEventListener('mousemove', (e)=>{
      if(modeDraw){
        draw(e);                
      }
      else if(modeForms){
        drawforms(e);
      }
      else if(mouse_Down){
        if(modeText){
          [lastX, lastY] = [e.offsetX, e.offsetY];
          [curserX,curserY]=[e.x,e.y];
          drawTextCurser(e);
        }
      }
    });
    canvas.addEventListener('mouseup', () => {
      if(modeDraw){
        isDrawing = false;
        saveHistory();
      }
      else if(modeForms){
        isResizing = false;
        saveHistory();
      }
      else if(modeText){
        mouse_Down=false;
      }
    });
    canvas.addEventListener('mouseout',(e)=>{
      if(modeText){
        mouse_Down=false;
      }
    });
    curserCanvas.addEventListener('mousedown',(e)=>{
      if(modeText){
        [lastX, lastY] = [e.offsetX, e.offsetY];
        [curserX,curserY]=[e.x,e.y];
        drawTextCurser(e);
        mouse_Down=true;
      }
    });
    curserCanvas.addEventListener('mouseup',(e)=>{
      if(modeText){
        mouse_Down=false;
      }
    });
    curserCanvas.addEventListener('mouseout',(e)=>{
      if(modeText){
        mouse_Down=false;
      }
    });
    curserCanvas.addEventListener('mousemove',(e)=>{
      if(mouse_Down){
        if(modeText){
          [lastX, lastY] = [e.offsetX, e.offsetY];
          [curserX,curserY]=[e.x,e.y];
          drawTextCurser(e);
        }
      }
    });
    colorPicker.addEventListener('change', () => {
      selectedColor = colorPicker.value;
    });
    colorPicker_f1.addEventListener('change', () => {
      forms_c1 = colorPicker_f1.value;
    });
    colorPicker_f2.addEventListener('change', () => {
      forms_c2 = colorPicker_f2.value;
    });
    standardColors.addEventListener('click', (e) => {
      if (e.target.classList.contains('color')) {
        isRainbowMode=false;
          isEraseMode=false;
          isFillMode=false;
        if (e.target.classList.contains('rbw')){
          isRainbowMode=true
        }
        else if (e.target.classList.contains('ers')){
          isEraseMode=true;
        }
        else if (e.target.classList.contains('fill')){
          isFillMode=true;
        }
        else{
          selectedColor = e.target.style.backgroundColor;
          colorPicker.value = selectedColor;
        }
      }
    });
    colorPickerText.addEventListener('change', () => {
      selectedColor = colorPickerText.value;
      drawTextCurser(null);
    });
    standardColorsText.addEventListener('click', (e) => {
      if (e.target.classList.contains('color')) {
        if (e.target.classList.contains('pik')) {
          selectedColor = colorPickerText.value;
        }
        else{
          selectedColor = e.target.style.backgroundColor;
          colorPicker.value = selectedColor;
        }
        drawTextCurser(null);
      }
    });
    standardColorsText.addEventListener('click', (e) => {
      if (e.target.classList.contains('color')) {
          selectedColor = e.target.style.backgroundColor;
      }
    });
    brushSizeInput.addEventListener('input', () => {
      brushSize = brushSizeInput.value;
    });
    brushOpacityInput.addEventListener('input', () => {

      brushOpacity = brushOpacityInput.value;
    });
    fontSelect.addEventListener("change", function() {
            selectedFont = fontSelect.value;
      drawTextCurser(null);
        });
    formSelect.addEventListener("change",function(){
      selectedform=formSelect.value;
      const forms =["forms_line","forms_tri","forms_rect","forms_circle","forms_elypse","forms_anygon","forms_polygon","forms_heart"];
      for(var i=0; i < forms.length; i++) { 
        var element = document.getElementById(forms[i]);
        if(selectedform==forms[i]) element.hidden=false;
        else element.hidden=true;
      }
    });
    formtypeSelect.addEventListener("change",function(){
      form_type=formtypeSelect.value;
    });
    f_pcorners.addEventListener("change",function(){
      corners=f_pcorners.value;
      var mouseX = f_x2;
      var mouseY = f_y2;
      changecornerswoe(event);
      tempCtx.clearRect(0, 0, canvas.width, canvas.height);
      tempCtx.drawImage(canvas, 0, 0);
      var a = mouseX-x;
      var b = mouseY-y;
      if(a<0)a=a*(-1);
      if(b<0)b=b*(-1);
      var r= Math.max(a,b)/2;
      tempCtx.beginPath();
      tempCtx.moveTo(clicks[0]._x,clicks[0]._y);//(clockwise)
      for(var i=1; i < clicks.length; i++) { 
        tempCtx.lineTo(clicks[i]._x,clicks[i]._y);
      }
      f_x2=mouseX;
      f_y2=mouseY;
      tempCtx.closePath();
      tempCtx.fill();
      tempCtx.stroke();
    });
    f_cornersSlider.addEventListener("change",function(){
      var mouseX = f_x2;
          var mouseY =f_y2;
            width = mouseX - x;
            height = mouseY - y;
            tempCtx.clearRect(0, 0, canvas.width, canvas.height);
            tempCtx.drawImage(canvas, 0, 0);
            tempCtx.beginPath();
            tempCtx.roundRect(x, y, width, height,f_cornersSlider.value);//(0°rounded corners)
            f_x2=mouseX;
            f_y2=mouseY;
            tempCtx.closePath();
        tempCtx.fill();
        tempCtx.stroke();
    });
    window.addEventListener('DOMContentLoaded', (event) => {
      const navbar = document.querySelector('.navbar');
      const tabs = navbar.getElementsByClassName('tab');
      const underline = document.createElement('div');
      underline.classList.add('underline-slide');
      navbar.appendChild(underline);
      let activeTab = navbar.querySelector('.menu_item_selected');
      if (activeTab) {
        underline.style.width = activeTab.offsetWidth + 'px';
        underline.style.transform = `translateX(${activeTab.offsetLeft}px)`;
      }
      for (let i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', function () {
          if (activeTab) {
            activeTab.classList.remove('menu_item_selected');
          }
          activeTab = this;
          activeTab.classList.add('menu_item_selected');
          underline.style.width = activeTab.offsetWidth + 'px';
          underline.style.transform = `translateX(${activeTab.offsetLeft}px)`;
        });
      }
      navbar.addEventListener('mouseleave', function () {
        if (activeTab) {
          underline.style.width = activeTab.offsetWidth + 'px';
          underline.style.transform = `translateX(${activeTab.offsetLeft}px)`;
        }
      });
      navbar.addEventListener('mouseover', function (e) {
        if (e.target.classList.contains('tab')) {
          const targetTab = e.target;
          underline.style.width = targetTab.offsetWidth + 'px';
          underline.style.transform = `translateX(${targetTab.offsetLeft}px)`;
        }
      });
    });
    imageUpload.addEventListener("change", handleImageUpload);
    aimenubutton.addEventListener('click',function (e) {
      aimenubutton.innerHTML = "Generating..."
      doai();
    });
    window.onload = function() {
    const toggle = document.getElementById('toggle-mode');
    const mode = localStorage.getItem('mode');
    toggle.checked = mode === 'dark';
    if (mode === 'dark') {
        changecolor();
    }
};
    /*functions*/


function changecolor(){
  document.body.classList.toggle("darkmode");
  var element = document.getElementById("navbar");
  element.classList.toggle("darkmode2");
  element = document.getElementById("opt__box");
  element.classList.toggle("darkmode3");
  element = document.getElementById("layer-box");
  element.classList.toggle("darkmode3");
  element = document.getElementById("info");
  element.classList.toggle("darkmode2");
  localStorage.setItem('mode', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}
    async function doai() {
      if(Ai_uses_left==0)return;
      Ai_uses_left--;
      document.getElementById("ichwillkeineidnamenmehrvergeben").textContent = Ai_uses_left+"/3 uses left";
      var prompt = ai_input.value;
      var API_KEY ="sk-8tkKCkRGSB2"+"Riu3OODOlT3BlbkFJ"+"DkXmLik4ODV81e6IKttT";
      const options={
          method:"POST",
          headers:{"Authorization":`Bearer ${API_KEY}`,'Content-Type':"application/json"},
          body:JSON.stringify({"prompt":prompt,"n":1,"size":"512x512"})}
      try{
        var response =null;
        response= await fetch('https://api.openai.com/v1/images/generations',options);
        const data = await response.json();
        const imageUrl = data.data[0].url;
        const img = new Image();
        img.onload = () => {
          var width = img.width;
          var height = img.height;
          if (width > height) {
            if (width > canvas.width) {
              height = height * (canvas.width / width);
              width = canvas.width;}
          } else {
            if (height > canvas.height) {
              width = width * (canvas.height / height);
              height = canvas.height;}}
          layers[currentLayerIndex].getContext('2d').drawImage(img, 0, 0), canvas.width,canvas.height;
          drawCurrentCanvas();
          saveHistorywhenAi();
          const layerPreviewImage = document.querySelector(`#layer-${currentLayerIndex}-preview`);
          layerPreviewImage.src = layers[currentLayerIndex].toDataURL();}
          aimenubutton.innerHTML = "Generate BETA";
        img.src = imageUrl;}
      catch(error){
        console.error(error)
        aimenubutton.innerHTML = "an error accured. ";
      }}

    function handleImageUpload(event) {
      const file = event.target.files[0];
      const image = new Image();
      image.onload = function() {
        var MAX_WIDTH = canvas.width;
        var MAX_HEIGHT = canvas.height;
        var width = image.width;
        var height = image.height;
        if (width > height) {
          if (width > MAX_WIDTH) {
            height = height * (MAX_WIDTH / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = width * (MAX_HEIGHT / height);
            height = MAX_HEIGHT;
          }
        }
        layers[currentLayerIndex].getContext('2d').drawImage(image, 0, 0, width, height);
        drawCurrentCanvas();
        saveHistorywhenAi();
        const layerPreviewImage = document.querySelector(`#layer-${currentLayerIndex}-preview`);
        layerPreviewImage.src = layers[currentLayerIndex].toDataURL();
      };
      const reader = new FileReader();
      reader.onload = function(event) {
      image.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }

    function deleteLayer() {
      if (layers.length > 1) {
        layers.splice(currentLayerIndex, 1);
        const layerContainer = document.getElementById(`layer-${currentLayerIndex}-container`);
        layerContainer.remove();
        redrawLayers();
      }
      layernumber--;
      saveHistory();
    }

    function createLayer() {
      if(layernumber<9){
        const layer = document.createElement('canvas');
        layer.width = canvas.width;
        layer.height = canvas.height;
        layers.push(layer);
        const layerIndex = layers.length - 1;
        const option = document.createElement('option');
        option.value = layerIndex;
        option.text = `Layer ${layerIndex + 1}`;
        document.getElementById('layer-select').appendChild(option);
        addLayerToContainer(layerIndex);
        const layerContainer = document.querySelector(`#layer-${layerIndex}-container`);
        if (layers.length === 1) {
          layerContainer.classList.add('highlighted');
        }
        layernumber++;
        saveHistory();
      }
    }

    function switchLayer() {
      currentLayerIndex = parseInt(this.value);
      if(modeFilters){
        selectMenuFilters();
      }
    }

    function mergeLayers() {
      if (currentLayerIndex < layers.length - 1) {
        const currentLayer = layers[currentLayerIndex];
        const belowLayer = layers[currentLayerIndex + 1];
        const currentLayerCtx = currentLayer.getContext('2d');
        currentLayerCtx.drawImage(belowLayer, 0, 0);
        layers.splice(currentLayerIndex + 1, 1);
        deleteLayerOption(currentLayerIndex + 1);
        deleteLayerContainer(currentLayerIndex + 1);
        redrawLayers();
        layernumber--;
        saveHistory();
      }
    }

    function moveLayerUp() {
      if (currentLayerIndex > 0) {
        swapLayers(currentLayerIndex, currentLayerIndex - 1);
        currentLayerIndex--;
        updateLayerSelect();
        redrawLayers();
      }
    }

    function moveLayerDown() {
      if (currentLayerIndex < layers.length - 1) {
        swapLayers(currentLayerIndex, currentLayerIndex + 1);
        currentLayerIndex++;
        updateLayerSelect();
        redrawLayers();
      }
    }

    function swapLayers(index1, index2) {
      const temp = layers[index1];
      layers[index1] = layers[index2];
      layers[index2] = temp;
      saveHistory();
    }

    function updateLayerSelect() {
      const layerSelect = document.getElementById('layer-select');
      layerSelect.value = currentLayerIndex;
    }

    function deleteLayerOption(layerIndex) {
      const layerSelect = document.getElementById('layer-select');
      layerSelect.remove(layerIndex);
    }

    function deleteLayerContainer(layerIndex) {
      const layerContainer = document.getElementById(`layer-${layerIndex}-container`);
      layerContainer.remove();
    }

    function drawCurrentCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      layers.forEach((layer, index) => {
        const layerCheckbox = document.querySelector(`#layer-${index}-checkbox`);
        if (layerCheckbox.checked) {
          ctx.drawImage(layer, 0, 0);
        }
      });
    }

    function duplicateLayer() {
      if(layernumber<9){
        const currentLayer = layers[currentLayerIndex];
        const newLayer = document.createElement('canvas');
        newLayer.width = currentLayer.width;
        newLayer.height = currentLayer.height;
        const newLayerCtx = newLayer.getContext('2d');
        newLayerCtx.drawImage(currentLayer, 0, 0);
        layers.splice(currentLayerIndex + 1, 0, newLayer);
        createLayerOption(currentLayerIndex + 1);
        addLayerToContainer(currentLayerIndex + 1);
        redrawLayers();
        layernumber++;
        saveHistory();
      }
    }

    function createLayerOption(layerIndex) {
      const option = document.createElement('option');
      option.value = layerIndex;
      option.text = `Layer ${layerIndex + 1}`;
      document.getElementById('layer-select').appendChild(option);
    }

    function addLayerToContainer(layerIndex) {
      const layerContainer = document.createElement('div');
      layerContainer.id = `layer-${layerIndex}-container`;
      layerContainer.className = 'layer-container';
      const layerImage = document.createElement('img');
      layerImage.id = `layer-${layerIndex}-preview`;
      layerImage.src = layers[layerIndex].toDataURL();
      layerImage.className = 'layer-image';
      const layerCheckbox = document.createElement('input');
      layerCheckbox.type = 'checkbox';
      layerCheckbox.className = 'layer-checkbox';
      layerCheckbox.id = `layer-${layerIndex}-checkbox`;
      layerCheckbox.checked = true;
      layerCheckbox.title="show Layer";
      layerCheckbox.addEventListener('input', drawCurrentCanvas);
      const layerLabel = document.createElement('label');
      layerLabel.innerText = `Layer ${layerIndex + 1}, `;
      layerLabel.appendChild(layerImage);
      layerLabel.appendChild(layerCheckbox);
      layerContainer.appendChild(layerLabel);
      layersContainer.appendChild(layerContainer);
      layerContainer.addEventListener('click', () => {
        currentLayerIndex = layerIndex;
        document.getElementById('layer-select').value = layerIndex;
        const allLayerContainers = document.getElementsByClassName('layer-container');
        for (let i = 0; i < allLayerContainers.length; i++) {
          allLayerContainers[i].classList.remove('highlighted');
        }
        layerContainer.classList.add('highlighted');
        curserCtx.clearRect(0,0,canvas.width,canvas.height);
        curserCtx.drawImage(layers[currentLayerIndex],0,0);
      });
      if (layerIndex === 0) {
        layerContainer.classList.add('highlighted');
      }
    }

    function undo() {
      if (historyIndex > 1) {
        historyIndex--;
        const history = layerHistory[historyIndex];
        layers = history.map((dataURL) => {
          const layer = document.createElement('canvas');
          layer.width = canvas.width;
          layer.height = canvas.height;
          const img = new Image();
          img.src = dataURL;
          layer.getContext('2d').drawImage(img, 0, 0);
          return layer;
        });
        redrawLayers();
      }
    }

    function redo() {
      if (historyIndex < layerHistory.length - 1) {
        historyIndex++;
        const history = layerHistory[historyIndex];
        layers = history.map((dataURL) => {
          const layer = document.createElement('canvas');
          layer.width = canvas.width;
          layer.height = canvas.height;
          const img = new Image();
          img.src = dataURL;
          layer.getContext('2d').drawImage(img, 0, 0);
          return layer;
        });
        redrawLayers();
      }
    }

    function saveHistory() {
      const history = layers.map((layer) => layer.toDataURL());
      layerHistory = layerHistory.slice(0, historyIndex + 1);
      layerHistory.push(history);
      historyIndex++;
    }

    function saveHistorywhenAi(){
      const historyState = {
        layers: layers.map(layer => layer.imageURL || ""), // Store image URLs
        currentLayerIndex: currentLayerIndex,
      };
      layerHistory.push(historyState);
    }

    function redrawLayers() {      
      const layerSelect = document.getElementById('layer-select');
      layerSelect.innerHTML = '';
      layersContainer.innerHTML = '';
      layers.forEach((layer, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.text = `Layer ${index + 1}`;
        layerSelect.appendChild(option);
        addLayerToContainer(index);
      });
      drawCurrentCanvas();
    }

    function changecorners(event){
      var mouseX = event.clientX - canvas.offsetLeft;
      var mouseY = event.clientY - canvas.offsetTop;
      var a = mouseX-x;
      var b = mouseY-y;
      if(a<0)a=a*(-1);
      if(b<0)b=b*(-1);
      var r= Math.max(a,b)/2;
      var alpha = 360/corners;
      clicks = null;
      clicks = [];
      for(var i=0; i < corners+1; i++) { 
        clicks.push({
          _x: (mouseX+x)/2  +  Math.cos(i*alpha * Math.PI / 180)*r,
          _y: (mouseY+y)/2  +  Math.sin(i*alpha * Math.PI / 180)*r
        });
      }
    }

    function changecornerswoe(event){
      var mouseX = f_x2;
      var mouseY = f_y2;
      var a = mouseX-x;
      var b = mouseY-y;
      if(a<0)a=a*(-1);
      if(b<0)b=b*(-1);
      var r= Math.max(a,b)/2;
      var alpha = 360/corners;
      clicks = null;
      clicks = [];
      for(var i=0; i < corners+1; i++) { 
        if(i<corners+1){
          clicks.push({
          _x: (mouseX+x)/2  +  Math.cos(i*alpha * Math.PI / 180)*r,
          _y: (mouseY+y)/2  +  Math.sin(i*alpha * Math.PI / 180)*r
        });     
        }
      }
    }

    function clearCanvas() {
      ctx.putImageData(actions[0].data, 0, 0);
      saveHistory();
    }

    function drawTextCurser(e){
      const history = layerHistory[historyIndex];
          layers = history.map((dataURL) => {
              const layer = document.createElement('canvas');
              layer.width = canvas.width;
              layer.height = canvas.height;
              const img = new Image();
              img.src = dataURL;
              layer.getContext('2d').drawImage(img, 0, 0);
              return layer;
            });
      tempCtx.clearRect(0,0,canvas.width,canvas.height);
      tempCtx.drawImage(tempCanvas,0,0);
      var d = document.getElementById("textcursor");
      d.style.position = "absolute";
      let cordstrg =  curserX+"px";
      d.style.left = cordstrg;
      cordstrg = curserY-TextSizeSlider.value+"px";
      d.style.top = cordstrg;
      cordstrg= TextSizeSlider.value+"px";
      d.style.height= cordstrg;
      let strg = TextSizeSlider.value +"px "+selectedFont;
      tempCtx.font= strg;
      tempCtx.fillStyle =selectedColor;
      tempCtx.fillText(TextInput.value, lastX, lastY);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
            layers.forEach((layer, index) => {
              const layerCtx = layer.getContext('2d');
              const layerCheckbox = document.querySelector(`#layer-${index}-checkbox`);
              if (layerCheckbox.checked) {
                if(index==currentLayerIndex){
                  layerCtx.drawImage(tempCanvas,0,0);
                }
              }
            });
            const layerPreviewImage = document.querySelector(`#layer-${currentLayerIndex}-preview`);
              layerPreviewImage.src = layers[currentLayerIndex].toDataURL();
              drawCurrentCanvas();
    }
    
    function drawforms(event){
      if(modeForms){
        if(form_type=="f"){
          tempCtx.strokeStyle='#00000000';
          tempCtx.fillStyle =forms_c2;
        }
        else if(form_type=="o"){
          tempCtx.strokeStyle=forms_c1;
          tempCtx.fillStyle ='#00000000';
        }
        else if(form_type=="of"){
          tempCtx.strokeStyle=forms_c1;
          tempCtx.fillStyle =forms_c2;
        }
        if(isResizing){
          const history = layerHistory[historyIndex];
          layers = history.map((dataURL) => {
              const layer = document.createElement('canvas');
              layer.width = canvas.width;
              layer.height = canvas.height;
              const img = new Image();
              img.src = dataURL;
              layer.getContext('2d').drawImage(img, 0, 0);
              return layer;
            });
            if(selectedform=="forms_line"){
              var mouseX = event.clientX - canvas.offsetLeft;
              var mouseY = event.clientY - canvas.offsetTop;
                tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
                tempCtx.beginPath();
                tempCtx.moveTo(x, y);
                tempCtx.lineTo(mouseX, mouseY);
            }
            else if(selectedform=="forms_tri"){
              var mouseX = event.clientX - canvas.offsetLeft;
              var mouseY = event.clientY - canvas.offsetTop;
                width = mouseX - x;
                height = mouseY - y;
                tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
                tempCtx.beginPath();
                if(!isrectangular){
                  tempCtx.moveTo(x, y);
                  tempCtx.lineTo(x, mouseY);
                  tempCtx.lineTo(mouseX, mouseY);
                }
                else{
                  tempCtx.moveTo((x+mouseX)/2, y);
                  tempCtx.lineTo(x, mouseY);
                  tempCtx.lineTo(mouseX, mouseY);
                }
            }
            else if(selectedform=="forms_rect"){
              var mouseX = event.clientX - canvas.offsetLeft;
              var mouseY = event.clientY - canvas.offsetTop;
                width = mouseX - x;
                height = mouseY - y;
                tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
                tempCtx.beginPath();
                tempCtx.roundRect(x, y, width, height,f_cornersSlider.value);//(0°rounded corners)
                f_x2=mouseX;
                f_y2=mouseY;
            }
            else if(selectedform=="forms_circle"){
              var mouseX = event.clientX - canvas.offsetLeft;
              var mouseY = event.clientY - canvas.offsetTop;
                tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
                tempCtx.beginPath();
                //mathe abvoten?
                var a = mouseX-x;
                var b = mouseY-y;
                if(a<0)a=a*(-1);
                if(b<0)b=b*(-1);
                var r= Math.max(a,b)/2;
                tempCtx.arc((x+mouseX)/2, (y+mouseY)/2, r, 0, 360,false);//(clockwise)
            }
            else if(selectedform=="forms_elypse"){
              var mouseX = event.clientX - canvas.offsetLeft;
              var mouseY = event.clientY - canvas.offsetTop;
                tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
                tempCtx.beginPath();
                //mathe abschaffen?
                var a = mouseX-x;
                var b = mouseY-y;
                if(a<0)a=a*(-1);
                if(b<0)b=b*(-1);
                tempCtx.ellipse((x+mouseX)/2, (y+mouseY)/2, a/2, b/2, 0, 0, 360);
            }
            else if(selectedform=="forms_polygon"){
              var mouseX = event.clientX - canvas.offsetLeft;
              var mouseY = event.clientY - canvas.offsetTop;
              changecorners(event);
              tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
              var a = mouseX-x;
              var b = mouseY-y;
              if(a<0)a=a*(-1);
              if(b<0)b=b*(-1);
              var r= Math.max(a,b)/2;
              tempCtx.beginPath();
              tempCtx.moveTo(clicks[0]._x,clicks[0]._y);//(clockwise)
              for(var i=1; i < clicks.length; i++) { 
                tempCtx.lineTo(clicks[i]._x,clicks[i]._y);
              }
              f_x2=mouseX;
              f_y2=mouseY;
            }
            else if(selectedform=="forms_heart"){
              var mouseX = event.clientX - canvas.offsetLeft;
              var mouseY = event.clientY - canvas.offsetTop;
                tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
                var a = mouseX-x;
                var b = mouseY-y;
                var k =x;
                var d=b;//height
                var v = a;//width
                tempCtx.beginPath();
                tempCtx.moveTo(k, k + d / 4);
                tempCtx.quadraticCurveTo(k        , k        , k + v / 4  , k);
                tempCtx.quadraticCurveTo(k + v / 2, k        , k + v / 2  , k + d / 4);
                tempCtx.quadraticCurveTo(k + v / 2, k        , k + v * 3/4, k);
                tempCtx.quadraticCurveTo(k + v    , k        , k + v      , k + d / 4);
                tempCtx.quadraticCurveTo(k + v    , k + d / 2, k + v * 3/4, k + d * 3/4);
                tempCtx.lineTo(			     k + v / 2, k + d);
                tempCtx.lineTo(			     k + v / 4, k + d * 3/4);
                tempCtx.quadraticCurveTo(k        , k + d / 2, k          , k + d / 4);
            }
            tempCtx.closePath();
            tempCtx.fill();
            tempCtx.stroke();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            layers.forEach((layer, index) => {
              const layerCtx = layer.getContext('2d');
              const layerCheckbox = document.querySelector(`#layer-${index}-checkbox`);
              if (layerCheckbox.checked&&index==currentLayerIndex) {
                layerCtx.drawImage(tempCanvas,0,0);
              }
            });
            const layerPreviewImage = document.querySelector(`#layer-${currentLayerIndex}-preview`);
              layerPreviewImage.src = layers[currentLayerIndex].toDataURL();
              drawCurrentCanvas();
        }
      }
    }

    function draw(e) {
      if (!isDrawing) return;
      if(isEraseMode){
        const currentLayer = layers[currentLayerIndex];
        if (!currentLayer) return;
        const layerCtx = currentLayer.getContext('2d');
        layerCtx.save(); 
        layerCtx.beginPath();
        layerCtx.arc(e.offsetX, e.offsetY, brushSize/2, 0, 2*Math.PI); 
        layerCtx.clip();
        layerCtx.clearRect(0, 0, canvas.width, canvas.height); 
        layerCtx.restore(); 
        [lastX, lastY] = [e.offsetX, e.offsetY];
        const layerPreviewImage = document.querySelector(`#layer-${currentLayerIndex}-preview`);
        layerPreviewImage.src = currentLayer.toDataURL();
        drawCurrentCanvas();
      }
      else{
        if (isRainbowMode) {
          const hue = Math.atan2(e.offsetY - lastY, e.offsetX - lastX) / (2 * Math.PI) + 0.5;
          ctx.strokeStyle = `hsl(${hue * 360}, 100%, 50%)`;
        }
        else {
          ctx.strokeStyle = selectedColor;
        }
        const currentLayer = layers[currentLayerIndex];
        if (!currentLayer) return;
        const layerCtx = currentLayer.getContext('2d');
        layerCtx.strokeStyle = ctx.strokeStyle;
        layerCtx.lineJoin = 'round';
        layerCtx.lineCap = 'round';
        layerCtx.lineWidth = brushSize;
        layerCtx.beginPath();
        layerCtx.globalAlpha = brushOpacity/255;
        layerCtx.moveTo(lastX, lastY);
        layerCtx.lineTo(e.offsetX, e.offsetY);
        layerCtx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
        const layerPreviewImage = document.querySelector(`#layer-${currentLayerIndex}-preview`);
        layerPreviewImage.src = currentLayer.toDataURL();
        drawCurrentCanvas();
      }
    }

    function resetFilters(){
      hueSlider.value = 0;
      blurSlider.value = 0;
      contrastSlider.value = 100;
      exposureSlider.value = 0;
      brightnessSlider.value = 100;
      saturationSlider.value = 100;
      grayscaleSlider.value=0;
      tempCtx.clearRect(0, 0, canvas.width, canvas.height);
      TextSizeSlider.value=20;
      TextInput.value="";
      tempCtx.filter='none';
      ctx.filter='none';
    }

    function applyFilters() {
      const hue = document.getElementById("hue").value;
      const blur = document.getElementById("blur").value;
      const grayscale = document.getElementById("grayscale").value;
      const invert = document.getElementById("invert").value;
      const exposure = document.getElementById("exposure").value;
      const saturation = document.getElementById("saturation").value;
      const brightness = document.getElementById("brightness").value;
      const contrast = document.getElementById("contrast").value;
      const adjustedBrightness = brightness * Math.pow(2, exposure);
      const adjustedContrast = parseInt(contrast) + (exposure * 10);
      tempCtx.clearRect(0,0,canvas.width,canvas.height);
      tempCtx.filter = `hue-rotate(${hue}deg) saturate(${saturation}%) brightness(${adjustedBrightness}%) contrast(${adjustedContrast}%) blur(${blur}px) grayscale(${grayscale}%) invert(${invert}%)`;
      tempCtx.drawImage(curserCanvas,0,0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      layers.forEach((layer, index) => {
        const layerCtx = layer.getContext('2d');
        const layerCheckbox = document.querySelector(`#layer-${index}-checkbox`);
        if (layerCheckbox.checked) {
          if(index==currentLayerIndex){
            layerCtx.clearRect(0, 0, canvas.width, canvas.height);
            layerCtx.drawImage(tempCanvas,0,0);
          }
        }
      });
      const layerPreviewImage = document.querySelector(`#layer-${currentLayerIndex}-preview`);
        layerPreviewImage.src = layers[currentLayerIndex].toDataURL();
        drawCurrentCanvas();
    }

    function downloadCanvas() {
      const link = document.createElement('a');
      link.download = 'canvas.png';
      link.href = canvas.toDataURL();
      link.click();
    }
    
  //algorithm from https://ben.akrin.com/an-html5-canvas-flood-fill-that-doesnt-kill-the-browser/  #4 
    function flood_fill( original_x, original_y, color ) {
        const currentLayer = layers[currentLayerIndex];
        const currentLayerCtx = currentLayer.getContext('2d');
        original_color = currentLayerCtx.getImageData( original_x, original_y, 1, 1 ).data ;
        original_color = { r:original_color[0],
                           g:original_color[1],
                           b:original_color[2],
                           a:original_color[3] } ;
        x = original_x ;
        y = original_y ;
        boundary_pixels = currentLayerCtx.getImageData( 0, 0, canvas.width, canvas.height ) ;
        linear_cords = (y * canvas.width + x) * 4 ;
        var done = false ;
        while( y>=0 && !done ) {
            var new_linear_cords = ( (y-1) * canvas.width + x ) * 4 ;
            if( boundary_pixels.data[new_linear_cords]==original_color.r &&
                boundary_pixels.data[new_linear_cords+1]==original_color.g &&
                boundary_pixels.data[new_linear_cords+2]==original_color.b &&
                boundary_pixels.data[new_linear_cords+3]==original_color.a ) {
                y = y - 1 ;
                linear_cords = new_linear_cords ;
            } else {
                done = true ;
            }
        }
        var path = [{x:x, y:y}] ;
        var first_iteration = true ;
        var iteration_count = 0 ;
        var orientation = 1 ; // 0:^, 1:<-, 2:v, 3:->
        while( !(path[path.length-1].x==path[0].x && path[path.length-1].y==path[0].y) || first_iteration ) {
            iteration_count++ ;
            first_iteration = false ;
            var got_it = false ;
            if( path.length>=2 ) {
                if( path[path.length-1].y-path[path.length-2].y<0 ) {
                    orientation = 0 ;
                } else if( path[path.length-1].x-path[path.length-2].x<0 ) {
                    orientation = 1 ;
                } else if( path[path.length-1].y-path[path.length-2].y>0 ) {
                    orientation = 2 ;
                } else if( path[path.length-1].x-path[path.length-2].x>0 ) {
                    orientation = 3 ;
                } else {
                }
            }
            for( var look_at=0 ; !got_it && look_at<=3 ; look_at++ ) {
                var both = (orientation + look_at) % 4 ;
                if( both==0 ) {
                    if( !got_it && (x+1)<canvas.width ) {
                        linear_cords = (y * canvas.width + (x+1)) * 4 ;
                        if( boundary_pixels.data[linear_cords]==original_color.r &&
                            boundary_pixels.data[linear_cords+1]==original_color.g &&
                            boundary_pixels.data[linear_cords+2]==original_color.b &&
                            boundary_pixels.data[linear_cords+3]==original_color.a ) {
                            got_it = true ;
                            x = x + 1 ;
                        }
                    }
                } else if( both==1 ) {
                    if( !got_it && (y-1)>=0 ) {
                        linear_cords = ((y-1) * canvas.width + x) * 4 ;
                        if( boundary_pixels.data[linear_cords]==original_color.r &&
                            boundary_pixels.data[linear_cords+1]==original_color.g &&
                            boundary_pixels.data[linear_cords+2]==original_color.b &&
                            boundary_pixels.data[linear_cords+3]==original_color.a ) {
                            got_it = true ;
                            y = y - 1 ;
                        }
                    }
                } else if( both==2 ) {
                    if( !got_it && (x-1)>=0 ) {
                        linear_cords = (y * canvas.width + (x-1)) * 4 ;
                        if( boundary_pixels.data[linear_cords]==original_color.r &&
                            boundary_pixels.data[linear_cords+1]==original_color.g &&
                            boundary_pixels.data[linear_cords+2]==original_color.b &&
                            boundary_pixels.data[linear_cords+3]==original_color.a ) {
                            got_it = true ;
                            x = x - 1 ;
                        }
                    }
                } else if( both==3 ) {
                    if( !got_it && (y+1)<canvas.height ) {
                        linear_cords = ((y+1) * canvas.width + x) * 4 ;
                        if( boundary_pixels.data[linear_cords]==original_color.r &&
                            boundary_pixels.data[linear_cords+1]==original_color.g &&
                            boundary_pixels.data[linear_cords+2]==original_color.b &&
                            boundary_pixels.data[linear_cords+3]==original_color.a ) {
                            got_it = true ;
                            y = y + 1 ;
                        }
                    }
                }
            }
            if( got_it ) {
                path.push( {x:x, y:y} ) ;
            }
        }
        draw_quadratic_curve( path, currentLayerCtx, color, 1, color ) ;
    }
    function draw_quadratic_curve( path, currentLayerCtx, color, thickness, fill_color ) {
        color = "rgba( " + color.r + "," + color.g + ","+ color.b + ","+ color.a + ")" ;
        fill_color = "rgba( " + fill_color.r + "," + fill_color.g + ","+ fill_color.b + ","+ fill_color.a + ")" ;
        currentLayerCtx.strokeStyle = color ;
        currentLayerCtx.fillStyle = fill_color ;
        currentLayerCtx.lineWidth = thickness ;
        currentLayerCtx.lineJoin = "round" ;
        currentLayerCtx.lineCap = "round" ;
        if( path.length>0 ) { // just in case
            if( path.length<3 ) {
                var b = path[0] ;
                currentLayerCtx.beginPath() ;
                currentLayerCtx.arc( b.x, b.y, currentLayerCtx.lineWidth / 2, 0, Math.PI * 2, !0 ) ;
                currentLayerCtx.fill() ;
                currentLayerCtx.closePath();
            } else {
              currentLayerCtx.beginPath() ;
              currentLayerCtx.moveTo( path[0].x, path[0].y ) ;
                for( var i = 1; i<path.length-2; i++ ) {
                    var c = (path[i].x + path[i + 1].x) / 2 ;
                    var d = (path[i].y + path[i + 1].y) / 2 ;
                    currentLayerCtx.quadraticCurveTo( path[i].x, path[i].y, c, d ) ;
                }
                currentLayerCtx.quadraticCurveTo( path[i].x, path[i].y, path[i + 1].x, path[i + 1].y ) ;
                currentLayerCtx.stroke() ;
            }
        }
        if( fill_color!==false ) {
          currentLayerCtx.fill() ;
        }
    }
    function color_to_rgba( color ) {
        if( color[0]=="#" ) { // hex notation
            color = color.replace( "#", "" ) ;
            var bigint = parseInt(color, 16);
            var r = (bigint >> 16) & 255;
            var g = (bigint >> 8) & 255;
            var b = bigint & 255;
            return {r:r,
                    g:g,
                    b:b,
                    a:255} ;
        } else if( color.indexOf("rgba(")==0 ) { // already in rgba notation
            color = color.replace( "rgba(", "" ).replace( " ", "" ).replace( ")", "" ).split( "," ) ;
            return {r:color[0],
                    g:color[1],
                    b:color[2],
                    a:color[3]*255} ;
        }else if(color.indexOf("rgb(")==0){//in rgb notation
          color = color.replace( "rgb(", "" ).replace( " ", "" ).replace( ")", "" ).split( "," ) ;
          return {r:color[0],
                    g:color[1],
                    b:color[2],
                    a:255} ;
        } else {
            return {r:0,
                    g:0,
                    b:0,
                    a:0} ;
        }
    }
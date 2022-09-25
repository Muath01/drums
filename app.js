class DrumKit{
    constructor(){
        this.pads = document.querySelectorAll(".pad");
        this.playBtn = document.querySelector(".play")
        this.muteBtns = document.querySelectorAll(".mute")
        this.currentKick = './sounds/kick-classic.wav';
        this.kickAudio = document.querySelector(".kick-sound")
        this.currentsnare = './sounds/scnare-acoustic01.wav'
        this.snareAudio = document.querySelector(".snare-sound")
        this.hihatAudio = './sounds/hihat.acoustic01.wav';
        this.hihatAudio = document.querySelector(".hihat-sound")
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
        this.selects = document.querySelectorAll('select')
        this.tempoSlider = document.querySelector(".tempo-slider")
        
    }
    activePad(){
        this.classList.toggle("active")
    }
    repeat(){
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`)
        //loop over pads
        activeBars.forEach(bar=>{
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`
            //check if pads are active? to play sound
            if(bar.classList.contains("active")){
                //check each sound
                if(bar.classList.contains("kick-pad")){
                    console.log("current time", this.kickAudio.currentTime)
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }else if(bar.classList.contains("snare-pad")){
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }else if(bar.classList.contains("hihat-pad")){
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        })
        this.index++;
    }
    start(){
        const interval = (60/this.bpm) * 1000;
       

        if(!this.isPlaying){ 
            this.isPlaying = setInterval(()=>{
            this.repeat();
        }, interval)
    }else{
            clearInterval(this.isPlaying)
            this.isPlaying = false
        }
    }
    updateBtn(){
        if(!this.isPlaying){
            this.playBtn.innerText = "Play";
            this.playBtn.classList.add('active')
            this.kickAudio.volume = 0;
            this.kickAudio.volume = 0;
            this.hihatAudio.volume = 0;
        }else{
            this.playBtn.innerText = "Stop";
            this.playBtn.classList.remove('active')
            this.hihatAudio.volume = 1;
            this.snareAudio.volume = 1;
            this.snareAudio.volume = 1;
            
        }
    }
    changeSound(event){
        const selectionName = event.target.name;
        const selectionValue = event.target.value;
        switch(selectionName){
            case "kick-select":
                this.kickAudio.src = selectionValue;
                break;
            case "snare-select":
                this.snareAudio.src = selectionValue;
                break;
            case "hihat-select":
                this.hihatAudio.src = selectionValue;
                break;
                }

            }
    MuteSound(event){
        const muteIndex = event.target.getAttribute('data-track')
        event.target.classList.toggle("active")
        if(event.target.classList.contains("active")){
            switch (muteIndex){
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    break;
                case "2":
                    this.hihatAudio.volume = 0;
            }
        }else{
            switch (muteIndex){
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.snareAudio.volume = 1;
                    break;
                case "2":
                    this.hihatAudio.volume = 1;
            }

        }
    }
    changeTempo(event){
        const tempoText = document.querySelector(".tempo-nr");
        // this.bpm = event.target.value
        tempoText.innerText = event.target.value;
        
    }
    updateTempo(event){
        this.bpm = event.target.value;
        clearInterval(this.isPlaying);
        console.log(this.isPlaying)
        this.isPlaying = null;
        console.log(this.isPlaying)
        const playBtn = document.querySelector(".play");
        if(!playBtn.classList.contains("active")){
            console.log("mahahahha")
            this.start();
        }
    }
}

const drumKit = new DrumKit();

//Event listenrs

console.log(drumKit)

drumKit.pads.forEach(pad=>{
    pad.addEventListener("click", drumKit.activePad)
    pad.addEventListener("animationend", function(){
        this.style.animation = "";
    })
})

drumKit.playBtn.addEventListener("click", ()=>{
    // drumKit.tempoRun();
    drumKit.start();
    drumKit.updateBtn();
})

drumKit.selects.forEach(select => {
    select.addEventListener("change", function(event){
        drumKit.changeSound(event);
    })
});

drumKit.muteBtns.forEach(btn=>{
    btn.addEventListener("click", (event)=>{
        drumKit.MuteSound(event);
    })
})

drumKit.tempoSlider.addEventListener("input", function(event){
    drumKit.changeTempo(event);
})

drumKit.tempoSlider.addEventListener("change", function(event){
    drumKit.updateTempo(event);
})

drumKit.tempoSlider.addEventListener("change", function(e) {
    drumKit.updateTempo(e);
  });
  
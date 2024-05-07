AFRAME.registerComponent("engen",{
    schema:{
        count : {default : 0 , type : "number"},
        id : {default :1 , type : "number"},
    },
    init:function(){
        setInterval(function(){
            
                var position1 = new THREE.Vector3();
                var position2 = new THREE.Vector3();
                
                var enemy = document.querySelector("#zombie").object3D;
                var player = document.querySelector("#camera-rig").object3D;

                player.getWorldPosition(position1);
                enemy.getWorldPosition(position2);
                
                position1.y=0

                var direction = new THREE.Vector3();

                var zombie = document.querySelector("#zombie")

                direction.subVectors(position1, position2)
                var mag = Math.sqrt(direction.x*direction.x + direction.y*direction.y + direction.z*direction.z)
                //console.log(mag)
                if(3.5 > mag){
                    var  {value} = document.querySelector("#countLife").getAttribute("text")
                    value = value == 0 ? 0 : value -1;
                    document.querySelector("#countLife").setAttribute("text",{value : value})
                    var soun1 = document.querySelector("#Zattack");
                    soun1.components.sound.playSound();
                    var soun2 = document.querySelector("#hurt");
                    soun2.components.sound.playSound();
                    if(value == 0){
                        document.querySelector("#over").setAttribute("visible",true)   
                        zombie.setAttribute("visible",false)                 
                    }    

            }
        },2000)
    },
    generate:function(){
        var zombie = document.createElement("a-entity")
        var x = Math.floor(Math.random() * 100 + -100);
        var y = Math.floor(Math.random() * 100 + -100);
        
        zombie.setAttribute("id","zombie")
        zombie.setAttribute("class","zombie")
        zombie.setAttribute("animation-mixer",{timeScale : 3})
        zombie.setAttribute("gltf-model","#zombie4")
        zombie.setAttribute("dynamic-body",{
            shape:"sphere",
            mass:0,
            sphereRadius:2,
        })
        zombie.setAttribute("look-at","#weapon")
        zombie.setAttribute("position",{
            x:x,
            y:0,
            z:y
        })

        console.log(x)
        console.log(y)
        
        zombie.setAttribute("scale",{
            x:2,
            y:2,
            z:2,
        })


        var scene = document.querySelector("#scene")
        scene.appendChild(zombie)
        var soun = document.querySelector("#spawn");
        soun.components.sound.playSound();
        var soun1 = document.querySelector("#growl");
        soun1.components.sound.playSound();
        this.data.count += 1
        this.data.id +=1
    },
    tick:function(){
        if(this.data.count <= 0){
            this.generate()
        }
        this.direction()

    },
    direction:function(){
            
            var position1 = new THREE.Vector3();
            var position2 = new THREE.Vector3();
            
            var enemy = document.querySelector("#zombie").object3D;
            var player = document.querySelector("#camera-rig").object3D;

            player.getWorldPosition(position1);
            enemy.getWorldPosition(position2);
            
            position1.y=0

            var direction = new THREE.Vector3();

            var zombie = document.querySelector("#zombie")

            direction.subVectors(position1, position2)
            var mag = Math.sqrt(direction.x*direction.x + direction.y*direction.y + direction.z*direction.z)
            //console.log(mag)
            if(mag > 3.5){    
                zombie.setAttribute("velocity",direction.normalize().multiplyScalar(2.5))
            }
            else if(mag<3.1){
                zombie.setAttribute("velocity",direction.normalize().multiplyScalar(-5))
            }
            else{
                zombie.setAttribute("velocity",direction.multiplyScalar(0))
            }    
        
    }
})
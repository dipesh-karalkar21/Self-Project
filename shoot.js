AFRAME.registerComponent("shoot",{
    init:function(){
        this.createBullet()
    },
    createBullet:function(){
        window.addEventListener("keydown",(e)=>{
            if(e.key == "z"){ 
                var bullet = document.createElement("a-entity")

                console.log("bullet created")

                bullet.setAttribute("geometry",{
                    primitive : "sphere",
                    radius : 0.1
                })
                bullet.setAttribute("material",{
                    color:"black"
                })
                bullet.setAttribute("dynamic-body",{
                    mass:"0"
                })
                var campos = document.querySelector("#camera-rig")
                pos = campos.getAttribute("position")

                bullet.setAttribute("position",{
                    x: pos.x ,
                    y: pos.y + 1.5,
                    z: pos.z
                })

                camdir = document.querySelector("#camera").object3D

                dir = new THREE.Vector3()
                camdir.getWorldDirection(dir)

                bullet.setAttribute("velocity",dir.multiplyScalar(-55))

                var scene = document.querySelector("#scene");

                var soun = document.querySelector("#gunSound");
                soun.components.sound.playSound();


                bullet.addEventListener("collide",function(e){
                    var zombie =e.detail.body.el
                    if(zombie.id.includes("zombie")){
                        var enemy = document.querySelector("#generator")
                        var {count} = enemy.getAttribute("engen")
                        console.log(count)
                        enemy.setAttribute("engen",{
                            count : count -1,
                            id:1
                        })
                        scene.removeChild(zombie)
                        scene.removeChild(bullet)
                    }
                })

                scene.appendChild(bullet)

            }
        })

    }
})
;(function(Vue){
    Vue.createApp({
    data(){
        return{
            loading:false,
            editIndex:null,
            contacts:[],
            input:{
                name:'',
                email:''
            }
        }
    },
    methods:{
        sendHandler(){
            let {name,email} = this.input
            if(!name || !email) return
            this.loading=true
            if (this.editIndex == null){
                axios.post('http://localhost:5000/contact',this.input)
            .then((res)=>{
                console.log(res)
                this.contacts.push(res.data)
                this.cancelHandler()
                this.loading=false
            }).catch((err)=>{
                console.log(err)
            }) 
            }else{
                // let id = this.contacts[this.editIndex].id
                let {id} = this.contacts[this.editIndex]
                axios.put('http://localhost:5000/contact/'+id,this.input)
                .then((res)=>{
                    this.contacts[this.editIndex]=res.data
                    this.cancelHandler()
                    this.loading=false
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
            },
        cancelHandler(){
            this.editIndex=null
            this.input.name=''
            this.input.email=''
        },
        changeHandler(index){
            let {name,email} = this.contacts[index]
            this.editIndex =index
            this.input.name=name
            this.input.email=email 
        },
        deleteHandler(index){
            let target = this.contacts[index]
            this.loading=true
            if(confirm(`You want delete ${target.name}'data ?`)){
                axios.delete('http://localhost:5000/contact/'+target.id)
                .then((res)=>{
                    this.contacts.splice(index,1)
                    })
                    this.cancelIdleCallback()
                .catch((err)=>{console.log(err)})  
            }
            this.loading=false 
        }
    },
    mounted(){
        this.loading = true
        axios.get('http://localhost:5000/contact')
        .then((res)=>{
            console.log(res)
            this.contacts=res.data
            this.loading=false
        }).catch((err)=>{
            console.log(err)
        }) 
    }   
}).mount('#app')
})(Vue) 
<template>
    <div style="height:100%;background:#fff;">
      
              <!-- <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="客户端" name="client"></el-tab-pane>
                <el-tab-pane label="服务端" name="server"></el-tab-pane>
                <el-tab-pane label="转发节点" name="forward"></el-tab-pane>
            </el-tabs> -->
           <nut-tabbar 
            @tab-switch="handleClick" 
            type="card" 
            :tabbar-list="tabList2"
            >
           </nut-tabbar>
            <nut-button small @click="addFn"  style="margin-left:15px;">添加文件</nut-button>
            

 <nut-leftslip :rightWidth="1" v-for="(item,index) in tableData" :key="index" style="border-bottom:1px solid;">
        <div slot="slip-main" class="slip-main"><b>{{item.filename}}</b><span style="margin-left:10px;">{{"("+item.check+')'}}</span></div>
        <div slot="slipbtns" class="slipbtns">
            <a href="javascript:;"  @click="catFn({filename:item.filename})">详情</a>
            <a href="javascript:;"  @click="runFn({filename:item.filename,ind:index},$event)">{{tableData[index].btnDataType}}</a>
            <a href="javascript:;"  @click="checkFn(index,{filename:item.filename})">Check</a>
            <a href="javascript:;"  @click="handleEdit({filename:item.filename})">编辑</a>
            <a href="javascript:;"  @click="handleDelete({filename:item.filename})">删除</a>
             <!-- <el-button 
                    size="mini"
                    @click="catFn({filename:item.filename})">详情</el-button>
                    <el-button
                    size="mini"
                    @click="runFn({filename:item.filename,ind:index},$event)">{{tableData[index].btnDataType}}</el-button>
                   
                    <el-button
                    size="mini"
                    @click="checkFn(index,{filename:item.filename})">Check</el-button>
                    <el-button
                    size="mini"
                    @click="handleEdit({filename:item.filename})">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete({filename:item.filename})">删除</el-button> -->
        </div>
    </nut-leftslip>

            
    
        <nut-dialog title="添加文件" :visible="dialogAddFormVisible" @ok-btn-click="addBtnFn" @cancel-btn-click="dialogAddFormVisible=false" @close="dialogAddFormVisible=false" cancelBtnTxt='关闭' textAlign='left' >
             <div class="nouItem">
                 <p >文件名</p>
                <nut-textinput 
                    v-model="addForm.filename"
                    
                    placeholder="请输入内容"
                    :clearBtn="true"
                    :disabled="false"
                /> 
             </div>
             <div class="nouItem">
                 <p >服务类型</p>
                <nut-textinput 
                    v-model="addForm.type"
                    label=""
                    placeholder="请输入内容"
                    :clearBtn="true"
                    :disabled="true"
                /> 
             </div>
             <div class="nouItem" v-if="$store.state.userInfo.nowType==='client'">
                 <p  >目标地址</p>
                <nut-textinput 
                
                    v-model="addForm.client.out_addr"
                    label=""
                    placeholder="127.0.0.1:12345"
                    :clearBtn="true"
                    :disabled="false"
                /> 
             </div>
             <div class="nouItem"  v-if="$store.state.userInfo.nowType==='client' || $store.state.userInfo.nowType==='server' || $store.state.userInfo.nowType==='forward'">
                 <p >监听端口</p>
                <nut-textinput 
               
                    v-model="addForm.client.port"
                    label=""
                    placeholder="55555"
                    :clearBtn="true"
                    :disabled="false"
                /> 
             </div>
             <div class="nouItem"  v-if="$store.state.userInfo.nowType==='client' || $store.state.userInfo.nowType==='server'">
                 <p>通信加密密钥</p>
                <nut-textinput 
               
                    v-model="addForm.client.uuid"
                    label=""
                    placeholder="00000000-0000-0000-0000-000000000000"
                    :clearBtn="true"
                    :disabled="false"
                /> 
             </div>
             <div class="nouItem" v-if="$store.state.userInfo.nowType==='forward'">
                 <p>目标服务器</p>
                    <nut-textinput 
                    
                        v-model="addForm.client.out_addr"
                        label=""
                        placeholder="127.0.0.1:12345"
                        :clearBtn="true"
                        :disabled="false"
                    /> 
             </div>
               
         </nut-dialog>
       
            <nut-dialog title="详情" :visible="dialogMoreVisible"  @cancel-btn-click="dialogMoreVisible=false" @close="dialogMoreVisible=false" cancelBtnTxt='关闭' textAlign='left' :noOkBtn='true'>
               
                <p v-for="(v,k,index) in $store.state.userInfo.moreData" :key="index+k" style="margin-top:10px;">
                   <b>{{k}}:</b>
                   <span style="margin-left:10px;">{{v}}</span>
                </p>
            </nut-dialog>
          
    </div>
</template>
<script>
  export default {
    data() {
      return {tabList2:[
        {
          'tabTitle':'客户端',
          'curr':true,
          'icon':'',
          
        },
        {
          'tabTitle':'服务端',
          'curr':false,
          'icon':''
        },
        {
          'tabTitle':'转发节点',
          'curr':false,
          'icon':'',
        }
      ],
          dialogMoreVisible:false,
          dialogAddFormVisible:false,
          activeName: 'client',
          formLabelWidth: 'px2rem(120)',
          addForm:{
              filename:'',
              type:this.$store.state.userInfo.nowType,
              client:{
                  out_addr:'127.0.0.1:12345',
                  port:'55555',
				  uuid:'00000000-0000-0000-0000-000000000000',
              }
          }
      }
    },
    computed:{
        tableData(){return this.$store.state.userInfo.listData},
    },
    watch:{
        
    },
    methods: {
        runFn(row,event){
            console.log('event',event.target.innerHTML)
            
             this.$confirm('是否继续?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                     if(event.target.innerHTML==='启动'){
                          this.$store.commit('userInfo/sendRun',{filename:row.filename,ind:row.ind});
                        // event.target.innerHTML='停止'
                      
                        return
                    }
                    if(event.target.innerHTML==='<!----><!----><span>启动</span>'){
                         this.$store.commit('userInfo/sendRun',{filename:row.filename,ind:row.ind});
                    event.target.innerHTML='<!----><!----><span>停止</span>'
              
                    return
                    }
                    if(event.target.innerHTML==='停止'){
                         this.$store.commit('userInfo/sendStop',{filename:row.filename,ind:row.ind});
                        // event.target.innerHTML='启动'
                        return
                    }
                    if(event.target.innerHTML==='<!----><!----><span>停止</span>'){
                         this.$store.commit('userInfo/sendStop',{filename:row.filename,ind:row.ind});
                    // event.target.innerHTML='<!----><!----><span>启动</span>'
                    return
                    }
                
                 
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
                });
            
        },
        handleDelete(row){
             this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                 this.$store.commit('userInfo/sendDel',{filename:row.filename});
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
                });
            
        },
        checkFn(inde,row){
            this.$store.commit('userInfo/setNowClick',{nowinde:inde,filename:row.filename});
            this.$store.commit('userInfo/sendCheck',{filename:row.filename});
        },
        catFn(row){
            console.log('row',row)
             this.$store.commit('userInfo/sendCat',{filename:row.filename});
             this.dialogMoreVisible=true
        },
        handleEdit(row){
            this.addForm.filename=row.filename
            this.dialogAddFormVisible=true
        },
        addFn(){
          this.dialogAddFormVisible=true
        },
        addBtnFn(){
            if(this.addForm.filename===''){
                alert('请输入文件名')
            }
             if(this.addForm.client.port===''){
                     alert('请输入port')
                 }
            if(this.$store.state.userInfo.nowType==='client'){
                 if(this.addForm.client.out_addr===''){
                     alert('请输入out_addr')
                 }
                 if(this.addForm.client.out_addr!=''&&this.addForm.client.port!=''&&this.addForm.client.uuid!=''){
                     this.$store.commit('userInfo/sendAddFile',[{
						    session_id: this.$store.state.userInfo.session_id,
                            "type":this.addForm.type,
                            "filename":this.addForm.filename,
                            "client": {
                                "out_addr": this.addForm.client.out_addr,
                                "port": this.addForm.client.port,
								"uuid": this.addForm.client.uuid,
                            }
                        }]);

                 }
                 
                
            }else if(this.$store.state.userInfo.nowType==='server'){
                  if(this.addForm.client.uuid!=''&&this.addForm.client.port!=''){
                        this.$store.commit('userInfo/sendAddFile',[{
						session_id: this.$store.state.userInfo.session_id,
                        "type":this.addForm.type,
                        "filename":this.addForm.filename,
                        "server": {
                            "port": this.addForm.client.port,
							"uuid": this.addForm.client.uuid,
                        }
                    }]);
                  }
                 
            }else if(this.$store.state.userInfo.nowType==='forward'){
                if(this.addForm.client.out_addr===''){
                            alert('请输入out_addr')
                        }
                        if(this.addForm.client.out_addr!=''&&this.addForm.client.port!=''){
                            this.$store.commit('userInfo/sendAddFile',[{
							session_id: this.$store.state.userInfo.session_id,
                            "type":this.addForm.type,
                            "filename":this.addForm.filename,
                            "forward": {
                                "out_addr": this.addForm.client.out_addr,
                                "port": this.addForm.client.port
                            }
                        }]);
                    }
               }
              this.dialogAddFormVisible = false
                
        },
        handleClick(tab, event) {
            console.log('ddd',tab)
                if(tab.tabTitle==='客户端'){
                    this.activeName='client'
                }
                if(tab.tabTitle==='服务端'){
                    this.activeName='server'
                }
                if(tab.tabTitle==='转发节点'){
                    this.activeName='forward'
                }
                this.$store.commit('userInfo/setTypea',this.activeName);
                this.addForm={
                filename:'',
                type:tab.name,
                client:{
                    out_ws_addr:'',
                    out_addr:'',
                    port:'',
                    cert_file:'',
                    key_file:""
                }
            }
        //     this.$store.commit('userInfo/setTypea',tab.name);
        //      this.addForm={
        //       filename:'',
        //       type:tab.name,
        //       client:{
        //           out_ws_addr:'',
        //           out_addr:'',
        //           port:'',
        //           cert_file:'',
        //           key_file:""
        //       }
        //   }
      }
       
       
    
    }
  }
</script>
<style lang="scss" scoped>
@import "../assets/sass/search.scss";

</style>
<style lang="scss">
.nut-dialog-title{font-size: px2rem(24);}
.nouItem p{margin-top:px2rem(20); margin-bottom:px2rem(10);font-size: px2rem(20);}
.nut-tabbar{height: px2rem(70);}
.icon-box .big-word{font-size: px2rem(20);}
.nut-button.small{font-size: px2rem(18); height: px2rem(24) ;}
.nut-leftslip .slipbtns a{font-size: px2rem(18);width: px2rem(50);}
// .nut-dialog span{font-size: px2rem(24);}
.nut-dialog input{font-size: px2rem(18);height: px2rem(40);}
.nut-dialog-btn{font-size: px2rem(24);height: px2rem(40);}
.nut-textinput-clear{width:px2rem(20);height:px2rem(20);}
.nut-leftslip{height:px2rem(80px);line-height: px2rem(40);}
.nut-dialog-footer{height:px2rem(40)}
.nut-dialog-body p{font-size: px2rem(16);line-height: px2rem(30);}
</style>


"use strict";(self.webpackChunknext_enterprise=self.webpackChunknext_enterprise||[]).push([[621],{"./components/Header/index.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,Logged_out:()=>Logged_out,__namedExportsOrder:()=>__namedExportsOrder,default:()=>index_stories});var react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),next_link=__webpack_require__("./node_modules/next/link.js"),link_default=__webpack_require__.n(next_link),__jsx=react.createElement,Header=function Header(_ref){var user=_ref.user;return __jsx("div",{className:"sticky top-0 z-30 flex w-full flex-col items-center"},__jsx("input",{id:"hamburgir",type:"checkbox",className:"peer sr-only",defaultChecked:!0}),__jsx("div",{id:"menu",className:"top-0 flex w-full scale-y-100 flex-col items-center gap-2 bg-white p-2 shadow-2xl  peer-checked:max-sm:hidden sm:flex-row sm:items-baseline"},__jsx(link_default(),{href:"/in",className:"text-xl font-bold sm:pr-8"},"WordBook"),__jsx(link_default(),{href:"#",className:"mx-4 text-primary-600 hover:underline"},"About"),__jsx(link_default(),{href:"#",className:"mx-4 text-primary-600 hover:underline"},"Contact"),__jsx(link_default(),{href:"#",className:"mx-4 text-primary-600 hover:underline"},"Support"),user?__jsx("div",{className:"flex flex-row flex-wrap items-center justify-center sm:ml-auto"},__jsx("h3",{className:"hidden text-sm font-bold sm:mr-4 sm:block"},user.name),__jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",className:"mt-4 h-8 w-full sm:mt-0 sm:w-8"},__jsx("circle",{cx:"12",cy:"12",r:"10",className:"fill-primary-600"}),__jsx("path",{className:"fill-primary-100",d:"M3.66 17.52A5 5 0 0 1 8 15h8a5 5 0 0 1 4.34 2.52 10 10 0 0 1-16.68 0zM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"})),__jsx("input",{type:"checkbox",id:"cb",className:"peer sr-only"}),__jsx("label",{htmlFor:"cb",className:"hidden w-full cursor-pointer place-content-center duration-200 peer-checked:scale-y-[-1] sm:grid sm:w-fit"},__jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",className:"w-8"},__jsx("path",{className:"fill-secondary-600",fillRule:"evenodd",d:"M15.3 10.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"}))),__jsx("div",{className:"flex w-48 origin-top flex-col items-center p-2 duration-200 sm:absolute sm:-translate-x-8 sm:translate-y-32 sm:scale-y-[0] sm:bg-secondary-200 sm:shadow-2xl sm:peer-checked:scale-y-100"},__jsx("h2",null,user.name),__jsx("h3",{className:"mb-4 text-sm"},"<",user.email,">"),__jsx(link_default(),{href:"/in/user",className:"text-primary-600 hover:underline"},"Edit profile"),__jsx(link_default(),{href:"#",className:"text-primary-600 hover:underline"},"App settings"),__jsx(link_default(),{href:"#",className:"text-primary-600 hover:underline"},"Account settings"),__jsx("a",{href:"/api/logout",className:" mt-4 self-end text-vividred-600 hover:underline"},"Log out"))):__jsx(react.Fragment,null,__jsx(link_default(),{href:"/login",className:"mt-4 box-border rounded-sm border-2 border-primary-600 p-1 px-2 text-primary-600 sm:ml-auto sm:mt-0",title:"log in"},"Log in"),__jsx(link_default(),{href:"/signup",className:"rounded-sm bg-primary-600 p-1 px-2 text-white",title:"register"},"Register"))),__jsx("label",{id:"switch",htmlFor:"hamburgir",className:"grid w-full cursor-pointer place-content-center duration-200  peer-checked:scale-y-[-1] sm:hidden"},__jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",className:"w-8"},__jsx("path",{className:"fill-secondary-600",fillRule:"evenodd",d:"M15.3 10.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"}))))};Header.displayName="Header";try{Header.displayName="Header",Header.__docgenInfo={description:"",displayName:"Header",props:{user:{defaultValue:null,description:"",name:"user",required:!1,type:{name:"UserID | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/Header/index.tsx#Header"]={docgenInfo:Header.__docgenInfo,name:"Header",path:"components/Header/index.tsx#Header"})}catch(__react_docgen_typescript_loader_error){}var index_stories_jsx=react.createElement,Default={render:function render(args){return index_stories_jsx(Header,args)}},Logged_out={render:function render(){return index_stories_jsx(Header,null)}};const index_stories={title:"Header",component:Header,args:{user:{_id:"653389acbaa0561a75bc4413",email:"1p22geo@gmail.com",name:"Bartosz Geodecki",hash:"489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35",added:1697876396926,type:"user"}}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: args => <Header {...args} />\n}",...Default.parameters?.docs?.source}}},Logged_out.parameters={...Logged_out.parameters,docs:{...Logged_out.parameters?.docs,source:{originalSource:"{\n  render: () => <Header />\n}",...Logged_out.parameters?.docs?.source}}};const __namedExportsOrder=["Default","Logged_out"]}}]);
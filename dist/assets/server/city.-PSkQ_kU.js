import{j as i}from"../static/env-aVgYgaUP.js";import{a as o}from"../static/GeolocateButton-AmeVg4g0.js";import{d as c}from"../static/head-AUm_yPyT.js";import{C as n}from"../static/template-pZazRuRt.js";import"../static/index-GsKUmZGr.js";import"../static/commonjsHelpers-DxDlwT5B.js";import"../static/index-wlo2zNRg.js";import"../static/index-Dpe2PwhM.js";import"../static/_arrayLikeKeys-pbm8Wg6m.js";import"../static/directory-F4ZsIkcY.js";const b=r=>r.document.slug,P=async r=>{const{dm_directoryParents:e,name:t,dm_directoryChildren:s}=r.document;(e||[]).push({name:t,slug:"",c_breadcrumb:t});const d=await o(r.document.locale);return Promise.resolve({...r,document:{...r.document,dm_directoryParents:e},translations:d})},R=r=>c(r),m=(r,e)=>({stream:{$id:r||"directory-city",fields:["id","uid","meta","name","slug","c_breadcrumb","c_meta","dm_baseEntityCount","c_directoryHeroDescription","c_addressRegionDisplayName","dm_directoryParents.slug","dm_directoryParents.name","dm_directoryParents.c_breadcrumb","dm_directoryChildren.slug","dm_directoryChildren.name","dm_directoryChildren.address","dm_directoryChildren.hours","dm_directoryChildren.c_title","dm_directoryChildren.c_fPName","dm_directoryChildren.c_virtualAgent","dm_directoryChildren.c_cTALocator1","dm_directoryChildren.c_cTALocator2","dm_directoryChildren.c_baseURL","dm_directoryChildren.c_contactURL","dm_directoryChildren.photoGallery","dm_directoryChildren.mainPhone","dm_directoryChildren.c_designations","dm_directoryChildren.c_addressRegionDisplayName"],filter:e||{savedFilterIds:["dm_defaultDirectory_address_city"]},localization:{locales:["en"]}}}),v=m(),x=r=>i.jsx(n,{...r});export{v as config,x as default,R as getHeadConfig,b as getPath,P as transformProps};

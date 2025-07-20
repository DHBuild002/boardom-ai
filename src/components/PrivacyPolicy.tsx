import React from 'react';

// Define the Privacy Policy as a functional component.
const PrivacyPolicy = () => {
  // The provided HTML content is stored in a template literal string.
  // Using `dangerouslySetInnerHTML` is the most straightforward way to render this
  // complex, pre-styled HTML block in React without manually converting
  // all `style` attributes and non-standard tags to their JSX equivalents.
  const privacyPolicyHtml = `
    <style>
      [data-custom-class='body'], [data-custom-class='body'] * {
        background: transparent !important;
      }
      [data-custom-class='title'], [data-custom-class='title'] * {
        font-family: Arial !important;
        font-size: 26px !important;
        color: #000000 !important;
      }
      [data-custom-class='subtitle'], [data-custom-class='subtitle'] * {
        font-family: Arial !important;
        color: #595959 !important;
        font-size: 14px !important;
      }
      [data-custom-class='heading_1'], [data-custom-class='heading_1'] * {
        font-family: Arial !important;
        font-size: 19px !important;
        color: #000000 !important;
      }
      [data-custom-class='heading_2'], [data-custom-class='heading_2'] * {
        font-family: Arial !important;
        font-size: 17px !important;
        color: #000000 !important;
      }
      [data-custom-class='body_text'], [data-custom-class='body_text'] * {
        color: #595959 !important;
        font-size: 14px !important;
        font-family: Arial !important;
      }
      [data-custom-class='link'], [data-custom-class='link'] * {
        color: #3030F1 !important;
        font-size: 14px !important;
        font-family: Arial !important;
        word-break: break-word !important;
      }
    </style>
    <div data-custom-class="body">
      <div><strong><span style="font-size: 26px;"><span data-custom-class="title"><h1>PRIVACY NOTICE</h1></span></span></strong></div>
      <div><span style="color: rgb(127, 127, 127);"><strong><span style="font-size: 15px;"><span data-custom-class="subtitle">Last updated __________</span></span></strong></span></div>
      <br><br><br>
      <div style="line-height: 1.5;"><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text">This Privacy Notice for __________ ('<strong>we</strong>', '<strong>us</strong>', or '<strong>our</strong>'), describes how and why we might access, collect, store, use, and/or share ('<strong>process</strong>') your personal information when you use our services ('<strong>Services</strong>'), including when you:</span></span></span></div>
      <ul>
        <li data-custom-class="body_text" style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);">Visit our website at <span style="color: rgb(0, 58, 250);"><a href="https://totalboardom.co.uk" target="_blank" data-custom-class="link">https://totalboardom.co.uk</a></span> or any website of ours that links to this Privacy Notice</span></li>
        <li data-custom-class="body_text" style="line-height: 1.5;"><span style="font-size: 15px;">Use Total Boardom - Kanban AI. A Kanban tool for prompts. Break your project down into easy to manage prompts.</span></li>
        <li data-custom-class="body_text" style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);">Engage with us in other related ways, including any sales, marketing, or events</span></li>
      </ul>
      <div style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(127, 127, 127);"><span data-custom-class="body_text"><strong>Questions or concerns? </strong>Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services.</span></span></div>
      <br><br>
      <div style="line-height: 1.5;"><strong><span style="font-size: 15px;"><span data-custom-class="heading_1"><h2>SUMMARY OF KEY POINTS</h2></span></span></strong></div>
      <div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text"><strong><em>This summary provides key points from our Privacy Notice, but you can find out more details by using our <a data-custom-class="link" href="#toc">table of contents</a> below to find the section you are looking for.</em></strong></span></span></div>
      <br>
      <div id="infocollect" style="line-height: 1.5;"><span style="color: rgb(0, 0, 0); font-size: 15px;"><span id="control" style="color: rgb(0, 0, 0);"><strong><span data-custom-class="heading_1"><h2>1. WHAT INFORMATION DO WE COLLECT?</h2></span></strong></span></span><span data-custom-class="heading_2" id="personalinfo" style="color: rgb(0, 0, 0);"><span style="font-size: 15px;"><strong><h3>Personal information you disclose to us</h3></strong></span></span><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text"><strong><em>In Short:</em></strong><em> We collect personal information that you provide to us.</em></span></span></span></div>
      <br>
      <div style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text">We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.</span></span></div>
      <br>
      <div style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text"><strong>Personal Information Provided by You.</strong> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:</span></span></div>
      <ul>
        <li data-custom-class="body_text" style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);">email addresses</span></li>
      </ul>
      <div id="sensitiveinfo" style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text"><strong>Sensitive Information.</strong> We do not process sensitive information.</span></span></div>
      <br>
      <div style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text">All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.</span></span></div>
      <span data-custom-class="heading_2" style="color: rgb(0, 0, 0);"><span style="font-size: 15px;"><strong><h3>Information automatically collected</h3></strong></span></span>
      <span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text"><strong><em>In Short:</em></strong>
      </div>
  `;
  
  // Render the component by setting the inner HTML of a div.
  return (
    <div dangerouslySetInnerHTML={{ __html: privacyPolicyHtml }} />
  );
};

export default PrivacyPolicy;
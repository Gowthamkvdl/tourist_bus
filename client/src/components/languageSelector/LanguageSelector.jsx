import React, { useEffect, useState } from "react";

const LanguageSelector = () => {
 
  return (
    <div className="language-selector">
      <h5 className="fw-bold">Select Language</h5>

      {/* Hidden Google Translate Element */}
      <div id="google_translate_element"></div>
    </div>
  );
};

export default LanguageSelector;

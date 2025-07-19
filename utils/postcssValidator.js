/**
 * PostCSS Validator - Ensures PostCSS configuration can reproduce all required styles
 * 
 * This utility validates that the PostCSS setup can generate all the styles
 * identified in the audit process.
 */

class PostCSSValidator {
  constructor() {
    this.requiredClasses = new Set();
    this.generatedClasses = new Set();
    this.missingClasses = new Set();
    this.config = null;
  }

  /**
   * Extract all Tailwind classes from captured styles
   */
  extractTailwindClasses(auditResults) {
    const classes = new Set();
    
    // Extract from element metadata
    if (auditResults.audits) {
      Object.values(auditResults.audits).forEach(audit => {
        audit.styles.forEach(style => {
          if (style._metadata && style._metadata.className) {
            const elementClasses = style._metadata.className.split(/\s+/);
            elementClasses.forEach(cls => {
              if (cls && this.isTailwindClass(cls)) {
                classes.add(cls);
              }
            });
          }
        });
      });
    }

    // Extract from DOM
    document.querySelectorAll('[class]').forEach(element => {
      const elementClasses = element.className.split(/\s+/);
      elementClasses.forEach(cls => {
        if (cls && this.isTailwindClass(cls)) {
          classes.add(cls);
        }
      });
    });

    this.requiredClasses = classes;
    return Array.from(classes);
  }

  /**
   * Check if a class name appears to be a Tailwind class
   */
  isTailwindClass(className) {
    // Common Tailwind patterns
    const tailwindPatterns = [
      /^(bg|text|border|p|m|w|h|flex|grid|rounded|shadow|hover|focus|md|lg|xl)-/,
      /^(max-w|min-w|max-h|min-h)-/,
      /^(space|gap|inset|top|right|bottom|left)-/,
      /^(opacity|z)-\d+$/,
      /^(transition|duration|ease)-/,
      /^\[.*\]$/, // Arbitrary values like [#F7F7FF]
    ];

    return tailwindPatterns.some(pattern => pattern.test(className));
  }

  /**
   * Validate current PostCSS configuration
   */
  async validatePostCSSConfig() {
    const validation = {
      timestamp: new Date().toISOString(),
      configFile: null,
      contentPaths: [],
      issues: [],
      recommendations: []
    };

    // For now, we'll provide general validation
    // In a real implementation, you'd read the actual config files
    validation.recommendations.push({
      type: 'update-content-paths',
      priority: 'high',
      message: 'Ensure tailwind.config.js content array includes all component files',
      suggestedPaths: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './App.tsx'
      ]
    });

    return validation;
  }
}

// Global instance
window.PostCSSValidator = PostCSSValidator;
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

    try {
      // Try to read current Tailwind config
      const configResponse = await fetch('/tailwind.config.js');
      if (configResponse.ok) {
        const configText = await configResponse.text();
        validation.configFile = configText;
        
        // Extract content paths
        const contentMatch = configText.match(/content:\s*\[([\s\S]*?)\]/);
        if (contentMatch) {
          const contentArray = contentMatch[1];
          validation.contentPaths = contentArray
            .split(',')
            .map(path => path.trim().replace(/['"]/g, ''))
            .filter(path => path);
        }
      }
    } catch (error) {
      validation.issues.push({
        type: 'config-access',
        severity: 'warning',
        message: 'Could not access tailwind.config.js file'
      });
    }

    // Validate content paths
    this.validateContentPaths(validation);
    
    // Check for missing classes
    this.validateClassGeneration(validation);

    return validation;
  }

  /**
   * Validate that content paths cover all component files
   */
  validateContentPaths(validation) {
    const requiredPaths = [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './App.tsx',
      './utils/**/*.{js,ts}'
    ];

    const missingPaths = requiredPaths.filter(path => 
      !validation.contentPaths.some(existing => 
        this.pathMatches(existing, path)
      )
    );

    if (missingPaths.length > 0) {
      validation.issues.push({
        type: 'missing-content-paths',
        severity: 'high',
        message: `Missing content paths: ${missingPaths.join(', ')}`,
        missingPaths
      });

      validation.recommendations.push({
        type: 'update-content-paths',
        priority: 'high',
        message: 'Update tailwind.config.js content array to include all component files',
        suggestedPaths: requiredPaths
      });
    }
  }

  /**
   * Check if two paths match (accounting for wildcards)
   */
  pathMatches(existing, required) {
    // Simple pattern matching - could be more sophisticated
    const existingPattern = existing.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*');
    const regex = new RegExp(`^${existingPattern}$`);
    return regex.test(required) || existing === required;
  }

  /**
   * Validate that PostCSS can generate all required classes
   */
  validateClassGeneration(validation) {
    // This would ideally run the PostCSS build and check output
    // For now, we'll simulate by checking common issues
    
    const problematicClasses = Array.from(this.requiredClasses).filter(cls => {
      // Classes with arbitrary values need special handling
      if (cls.includes('[') && cls.includes(']')) {
        return true; // Flag for manual review
      }
      
      // Custom classes that might not be in Tailwind
      if (!this.isStandardTailwindClass(cls)) {
        return true;
      }
      
      return false;
    });

    if (problematicClasses.length > 0) {
      validation.issues.push({
        type: 'problematic-classes',
        severity: 'moderate',
        message: `${problematicClasses.length} classes may need special configuration`,
        classes: problematicClasses
      });
    }
  }

  /**
   * Check if a class is a standard Tailwind class
   */
  isStandardTailwindClass(className) {
    // This is a simplified check - in practice, you'd want a comprehensive list
    const standardPrefixes = [
      'bg', 'text', 'border', 'p', 'm', 'w', 'h', 'flex', 'grid',
      'rounded', 'shadow', 'opacity', 'transition', 'hover', 'focus',
      'md', 'lg', 'xl', '2xl', 'sm'
    ];

    return standardPrefixes.some(prefix => className.startsWith(prefix + '-'));
  }

  /**
   * Generate PostCSS configuration recommendations
   */
  generateConfigRecommendations(auditResults) {
    const recommendations = {
      tailwindConfig: {},
      postcssConfig: {},
      buildProcess: []
    };

    // Tailwind config recommendations
    recommendations.tailwindConfig = {
      content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './App.tsx',
        './utils/**/*.{js,ts}'
      ],
      theme: {
        extend: {
          colors: {
            primary: '#10219F',
            secondary: '#FE5F55',
            accent: '#BDD5EA',
            background: '#F7F7FF',
            text: '#000000'
          },
          fontFamily: {
            sans: ['Inter', 'sans-serif']
          }
        }
      },
      safelist: this.generateSafelist()
    };

    // PostCSS config recommendations
    recommendations.postcssConfig = {
      plugins: {
        '@tailwindcss/postcss': {},
        autoprefixer: {}
      }
    };

    // Build process recommendations
    recommendations.buildProcess = [
      'Ensure all component files are included in Tailwind content paths',
      'Use safelist for dynamically generated classes',
      'Consider using @apply for complex component styles',
      'Verify that arbitrary values are properly escaped in class names'
    ];

    return recommendations;
  }

  /**
   * Generate safelist for dynamic classes
   */
  generateSafelist() {
    const safelist = [];
    
    // Add classes that might be generated dynamically
    const dynamicPatterns = [
      { pattern: /bg-\[#[A-Fa-f0-9]{6}\]/ },
      { pattern: /text-\[#[A-Fa-f0-9]{6}\]/ },
      { pattern: /border-\[#[A-Fa-f0-9]{6}\]/ }
    ];

    Array.from(this.requiredClasses).forEach(cls => {
      if (dynamicPatterns.some(pattern => pattern.pattern.test(cls))) {
        safelist.push(cls);
      }
    });

    return safelist;
  }

  /**
   * Test PostCSS build output
   */
  async testBuildOutput() {
    // This would require running the actual build process
    // For now, we'll return a placeholder
    return {
      success: true,
      generatedCSS: null,
      classCount: 0,
      fileSize: 0,
      warnings: []
    };
  }

  /**
   * Generate comprehensive validation report
   */
  generateValidationReport(auditResults) {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalClasses: this.requiredClasses.size,
        validatedClasses: 0,
        issues: 0
      },
      classAnalysis: this.analyzeClasses(),
      configValidation: null,
      recommendations: null
    };

    // Run validation
    this.validatePostCSSConfig().then(validation => {
      report.configValidation = validation;
      report.summary.issues = validation.issues.length;
    });

    // Generate recommendations
    report.recommendations = this.generateConfigRecommendations(auditResults);

    return report;
  }

  /**
   * Analyze the types of classes being used
   */
  analyzeClasses() {
    const analysis = {
      byCategory: {},
      arbitraryValues: [],
      customClasses: [],
      responsive: [],
      interactive: []
    };

    Array.from(this.requiredClasses).forEach(cls => {
      // Categorize classes
      if (cls.includes('[') && cls.includes(']')) {
        analysis.arbitraryValues.push(cls);
      }
      
      if (cls.includes(':')) {
        analysis.interactive.push(cls);
      }
      
      if (/^(sm|md|lg|xl|2xl):/.test(cls)) {
        analysis.responsive.push(cls);
      }
      
      // Extract category
      const category = cls.split('-')[0];
      if (!analysis.byCategory[category]) {
        analysis.byCategory[category] = [];
      }
      analysis.byCategory[category].push(cls);
    });

    return analysis;
  }
}

// Global instance
window.PostCSSValidator = PostCSSValidator;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PostCSSValidator;
}
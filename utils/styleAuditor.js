/**
 * Style Auditor - Comprehensive CSS comparison between CDN and PostCSS builds
 * 
 * This utility captures all computed styles from elements and provides
 * detailed comparison capabilities to ensure 100% style parity.
 */

class StyleAuditor {
  constructor() {
    this.capturedStyles = new Map();
    this.comparisonResults = [];
    this.mediaQueries = [];
    this.dynamicStyles = new Map();
  }

  /**
   * Capture all computed styles for elements matching selectors
   * @param {Array<string>} selectors - CSS selectors to audit
   * @param {string} version - 'cdn' or 'postcss'
   */
  captureStyles(selectors = ['*'], version = 'cdn') {
    const results = {
      version,
      timestamp: new Date().toISOString(),
      styles: new Map(),
      mediaQueries: this.captureMediaQueries(),
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };

    // Capture styles for each selector
    selectors.forEach(selector => {
      try {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
          const elementKey = `${selector}[${index}]`;
          const computedStyle = window.getComputedStyle(element);
          const styleObject = this.computedStyleToObject(computedStyle);
          
          // Add element-specific metadata
          styleObject._metadata = {
            tagName: element.tagName.toLowerCase(),
            className: element.className,
            id: element.id,
            position: this.getElementPosition(element),
            dimensions: this.getElementDimensions(element)
          };

          results.styles.set(elementKey, styleObject);
        });
      } catch (error) {
        console.warn(`Failed to capture styles for selector: ${selector}`, error);
      }
    });

    this.capturedStyles.set(version, results);
    return results;
  }

  /**
   * Convert ComputedStyle object to plain object
   * @param {CSSStyleDeclaration} computedStyle 
   */
  computedStyleToObject(computedStyle) {
    const styleObj = {};
    
    // Get all CSS properties
    for (let i = 0; i < computedStyle.length; i++) {
      const property = computedStyle[i];
      const value = computedStyle.getPropertyValue(property);
      
      // Only include non-default values to reduce noise
      if (value && value !== 'initial' && value !== 'auto' && value !== 'normal') {
        styleObj[property] = value;
      }
    }
    
    return styleObj;
  }

  /**
   * Capture all media queries from stylesheets
   */
  captureMediaQueries() {
    const mediaQueries = [];
    
    try {
      Array.from(document.styleSheets).forEach(sheet => {
        try {
          Array.from(sheet.cssRules || sheet.rules || []).forEach(rule => {
            if (rule.type === CSSRule.MEDIA_RULE) {
              mediaQueries.push({
                media: rule.media.mediaText,
                rules: Array.from(rule.cssRules).map(r => r.cssText)
              });
            }
          });
        } catch (e) {
          // Cross-origin stylesheets may throw errors
          console.warn('Cannot access stylesheet rules (likely cross-origin):', e);
        }
      });
    } catch (error) {
      console.warn('Error capturing media queries:', error);
    }
    
    return mediaQueries;
  }

  /**
   * Get element position relative to viewport
   */
  getElementPosition(element) {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      right: rect.right,
      bottom: rect.bottom
    };
  }

  /**
   * Get element dimensions
   */
  getElementDimensions(element) {
    return {
      width: element.offsetWidth,
      height: element.offsetHeight,
      scrollWidth: element.scrollWidth,
      scrollHeight: element.scrollHeight
    };
  }

  /**
   * Compare styles between two versions
   * @param {string} version1 - First version identifier
   * @param {string} version2 - Second version identifier
   */
  compareStyles(version1 = 'cdn', version2 = 'postcss') {
    const styles1 = this.capturedStyles.get(version1);
    const styles2 = this.capturedStyles.get(version2);

    if (!styles1 || !styles2) {
      throw new Error(`Missing style data for comparison. Available: ${Array.from(this.capturedStyles.keys()).join(', ')}`);
    }

    const comparison = {
      timestamp: new Date().toISOString(),
      versions: [version1, version2],
      summary: {
        totalElements: Math.max(styles1.styles.size, styles2.styles.size),
        identicalElements: 0,
        differentElements: 0,
        missingElements: 0
      },
      differences: [],
      mediaQueryDifferences: this.compareMediaQueries(styles1.mediaQueries, styles2.mediaQueries)
    };

    // Compare each element's styles
    const allKeys = new Set([...styles1.styles.keys(), ...styles2.styles.keys()]);
    
    allKeys.forEach(elementKey => {
      const style1 = styles1.styles.get(elementKey);
      const style2 = styles2.styles.get(elementKey);

      if (!style1 || !style2) {
        comparison.summary.missingElements++;
        comparison.differences.push({
          element: elementKey,
          type: 'missing',
          missing: !style1 ? version1 : version2,
          details: `Element exists in ${!style1 ? version2 : version1} but not in ${!style1 ? version1 : version2}`
        });
        return;
      }

      const elementDiff = this.compareElementStyles(style1, style2, elementKey);
      
      if (elementDiff.differences.length === 0) {
        comparison.summary.identicalElements++;
      } else {
        comparison.summary.differentElements++;
        comparison.differences.push(elementDiff);
      }
    });

    this.comparisonResults.push(comparison);
    return comparison;
  }

  /**
   * Compare styles for a single element
   */
  compareElementStyles(style1, style2, elementKey) {
    const differences = [];
    const allProperties = new Set([...Object.keys(style1), ...Object.keys(style2)]);

    allProperties.forEach(property => {
      if (property === '_metadata') return; // Skip metadata

      const value1 = style1[property];
      const value2 = style2[property];

      if (value1 !== value2) {
        differences.push({
          property,
          value1: value1 || 'undefined',
          value2: value2 || 'undefined',
          severity: this.calculateDifferenceSeverity(property, value1, value2)
        });
      }
    });

    return {
      element: elementKey,
      type: 'different',
      metadata: style1._metadata || style2._metadata,
      differences,
      summary: `${differences.length} property differences`
    };
  }

  /**
   * Calculate the severity of a style difference
   */
  calculateDifferenceSeverity(property, value1, value2) {
    // Critical properties that affect layout
    const criticalProperties = [
      'display', 'position', 'width', 'height', 'margin', 'padding',
      'border', 'background', 'color', 'font-size', 'font-family'
    ];

    // Minor properties that rarely affect visual appearance
    const minorProperties = [
      'cursor', 'user-select', 'pointer-events', 'outline'
    ];

    if (criticalProperties.some(prop => property.includes(prop))) {
      return 'critical';
    } else if (minorProperties.some(prop => property.includes(prop))) {
      return 'minor';
    } else {
      return 'moderate';
    }
  }

  /**
   * Compare media queries between versions
   */
  compareMediaQueries(mq1, mq2) {
    const differences = [];
    
    // Simple comparison - in a real implementation, you'd want more sophisticated matching
    if (mq1.length !== mq2.length) {
      differences.push({
        type: 'count',
        message: `Different number of media queries: ${mq1.length} vs ${mq2.length}`
      });
    }

    return differences;
  }

  /**
   * Generate a comprehensive report
   */
  generateReport(comparison) {
    const report = {
      ...comparison,
      recommendations: this.generateRecommendations(comparison),
      exportData: this.prepareExportData(comparison)
    };

    return report;
  }

  /**
   * Generate recommendations based on comparison results
   */
  generateRecommendations(comparison) {
    const recommendations = [];

    if (comparison.summary.missingElements > 0) {
      recommendations.push({
        type: 'missing-elements',
        priority: 'high',
        message: `${comparison.summary.missingElements} elements are missing in one version. Check Tailwind content paths.`
      });
    }

    const criticalDifferences = comparison.differences.filter(diff => 
      diff.differences && diff.differences.some(d => d.severity === 'critical')
    );

    if (criticalDifferences.length > 0) {
      recommendations.push({
        type: 'critical-differences',
        priority: 'high',
        message: `${criticalDifferences.length} elements have critical style differences that may affect layout.`
      });
    }

    return recommendations;
  }

  /**
   * Prepare data for export/debugging
   */
  prepareExportData(comparison) {
    return {
      json: JSON.stringify(comparison, null, 2),
      csv: this.convertToCSV(comparison),
      summary: this.createSummaryText(comparison)
    };
  }

  /**
   * Convert comparison results to CSV format
   */
  convertToCSV(comparison) {
    const rows = [['Element', 'Property', 'CDN Value', 'PostCSS Value', 'Severity']];
    
    comparison.differences.forEach(diff => {
      if (diff.differences) {
        diff.differences.forEach(propDiff => {
          rows.push([
            diff.element,
            propDiff.property,
            propDiff.value1,
            propDiff.value2,
            propDiff.severity
          ]);
        });
      }
    });

    return rows.map(row => row.join(',')).join('\n');
  }

  /**
   * Create a human-readable summary
   */
  createSummaryText(comparison) {
    return `
Style Comparison Summary
========================
Versions: ${comparison.versions.join(' vs ')}
Total Elements: ${comparison.summary.totalElements}
Identical: ${comparison.summary.identicalElements}
Different: ${comparison.summary.differentElements}
Missing: ${comparison.summary.missingElements}

Accuracy: ${((comparison.summary.identicalElements / comparison.summary.totalElements) * 100).toFixed(2)}%
    `.trim();
  }

  /**
   * Monitor dynamic style changes
   */
  startDynamicMonitoring(selectors = ['*'], interval = 1000) {
    const monitor = setInterval(() => {
      const currentStyles = this.captureStyles(selectors, `dynamic-${Date.now()}`);
      // Store for later comparison
      this.dynamicStyles.set(Date.now(), currentStyles);
    }, interval);

    return monitor;
  }

  /**
   * Export all captured data
   */
  exportData() {
    return {
      capturedStyles: Object.fromEntries(this.capturedStyles),
      comparisonResults: this.comparisonResults,
      dynamicStyles: Object.fromEntries(this.dynamicStyles)
    };
  }
}

// Global instance
window.StyleAuditor = StyleAuditor;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StyleAuditor;
}
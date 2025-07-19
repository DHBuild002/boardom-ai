/**
 * Audit Runner - Orchestrates the style auditing process
 * 
 * This script provides a simple interface to run comprehensive
 * style audits and comparisons between CDN and PostCSS builds.
 */

class AuditRunner {
  constructor() {
    this.auditor = new StyleAuditor();
    this.config = {
      selectors: [
        'header', 'nav', 'main', 'section', 'footer',
        '.bg-\\[\\#F7F7FF\\]', '.text-\\[\\#000000\\]', '.text-\\[\\#10219F\\]',
        '.bg-\\[\\#10219F\\]', '.bg-\\[\\#BDD5EA\\]', '.text-\\[\\#FE5F55\\]',
        'h1', 'h2', 'h3', 'p', 'button', 'input', 'form',
        '.max-w-7xl', '.max-w-4xl', '.max-w-6xl', '.max-w-lg',
        '.grid', '.flex', '.rounded-lg', '.rounded-xl', '.rounded-2xl',
        '.shadow-lg', '.shadow-md', '.border', '.hover\\:shadow-lg'
      ],
      viewports: [
        { width: 1920, height: 1080, name: 'desktop' },
        { width: 768, height: 1024, name: 'tablet' },
        { width: 375, height: 667, name: 'mobile' }
      ]
    };
  }

  /**
   * Run a complete audit cycle
   */
  async runCompleteAudit() {
    console.log('🔍 Starting comprehensive style audit...');
    
    const results = {
      timestamp: new Date().toISOString(),
      audits: {},
      comparisons: {},
      summary: {}
    };

    // Step 1: Capture CDN styles (if available)
    if (this.isCDNActive()) {
      console.log('📊 Capturing CDN styles...');
      results.audits.cdn = this.auditor.captureStyles(this.config.selectors, 'cdn');
      console.log(`✅ Captured styles for ${results.audits.cdn.styles.size} elements`);
    }

    // Step 2: Capture PostCSS styles
    console.log('📊 Capturing PostCSS styles...');
    results.audits.postcss = this.auditor.captureStyles(this.config.selectors, 'postcss');
    console.log(`✅ Captured styles for ${results.audits.postcss.styles.size} elements`);

    // Step 3: Compare if both versions available
    if (results.audits.cdn && results.audits.postcss) {
      console.log('🔄 Comparing CDN vs PostCSS styles...');
      results.comparisons.cdnVsPostcss = this.auditor.compareStyles('cdn', 'postcss');
      
      const comparison = results.comparisons.cdnVsPostcss;
      console.log(`📈 Comparison complete:`);
      console.log(`   - Identical elements: ${comparison.summary.identicalElements}`);
      console.log(`   - Different elements: ${comparison.summary.differentElements}`);
      console.log(`   - Missing elements: ${comparison.summary.missingElements}`);
      
      const accuracy = (comparison.summary.identicalElements / comparison.summary.totalElements) * 100;
      console.log(`   - Style accuracy: ${accuracy.toFixed(2)}%`);
    }

    // Step 4: Generate comprehensive report
    if (results.comparisons.cdnVsPostcss) {
      results.report = this.auditor.generateReport(results.comparisons.cdnVsPostcss);
    }

    return results;
  }

  /**
   * Run audit across multiple viewports
   */
  async runResponsiveAudit() {
    console.log('📱 Starting responsive audit across viewports...');
    
    const results = {};
    
    for (const viewport of this.config.viewports) {
      console.log(`🔍 Testing ${viewport.name} (${viewport.width}x${viewport.height})`);
      
      // Resize viewport
      if (window.resizeTo) {
        window.resizeTo(viewport.width, viewport.height);
      } else {
        // For testing environments, we'll simulate
        Object.defineProperty(window, 'innerWidth', { value: viewport.width, writable: true });
        Object.defineProperty(window, 'innerHeight', { value: viewport.height, writable: true });
      }
      
      // Wait for layout to settle
      await this.wait(500);
      
      // Capture styles for this viewport
      const auditResult = await this.runCompleteAudit();
      results[viewport.name] = auditResult;
    }
    
    return results;
  }

  /**
   * Check if CDN is currently active
   */
  isCDNActive() {
    const scripts = document.querySelectorAll('script[src*="tailwindcss.com"]');
    return scripts.length > 0;
  }

  /**
   * Generate actionable recommendations
   */
  generateActionPlan(auditResults) {
    const actionPlan = {
      immediate: [],
      shortTerm: [],
      longTerm: [],
      configuration: {}
    };

    if (auditResults.comparisons && auditResults.comparisons.cdnVsPostcss) {
      const comparison = auditResults.comparisons.cdnVsPostcss;
      
      // Immediate actions for critical differences
      const criticalDiffs = comparison.differences.filter(diff => 
        diff.differences && diff.differences.some(d => d.severity === 'critical')
      );
      
      if (criticalDiffs.length > 0) {
        actionPlan.immediate.push({
          action: 'Fix critical style differences',
          priority: 'HIGH',
          details: `${criticalDiffs.length} elements have critical styling issues`,
          elements: criticalDiffs.map(d => d.element)
        });
      }

      // Configuration recommendations
      if (comparison.summary.missingElements > 0) {
        actionPlan.configuration.tailwindContent = {
          issue: 'Missing elements in PostCSS build',
          recommendation: 'Update Tailwind content paths to include all component files',
          currentPaths: 'Check tailwind.config.js content array',
          suggestedPaths: [
            './index.html',
            './src/**/*.{js,ts,jsx,tsx}',
            './components/**/*.{js,ts,jsx,tsx}',
            './App.tsx',
            './utils/**/*.{js,ts}'
          ]
        };
      }
    }

    return actionPlan;
  }

  /**
   * Export audit results in multiple formats
   */
  exportResults(results, format = 'json') {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    switch (format) {
      case 'json':
        return {
          filename: `style-audit-${timestamp}.json`,
          content: JSON.stringify(results, null, 2),
          mimeType: 'application/json'
        };
      
      case 'csv':
        if (results.comparisons && results.comparisons.cdnVsPostcss) {
          return {
            filename: `style-differences-${timestamp}.csv`,
            content: this.auditor.convertToCSV(results.comparisons.cdnVsPostcss),
            mimeType: 'text/csv'
          };
        }
        break;
      
      case 'html':
        return {
          filename: `style-audit-report-${timestamp}.html`,
          content: this.generateHTMLReport(results),
          mimeType: 'text/html'
        };
    }
  }

  /**
   * Generate HTML report
   */
  generateHTMLReport(results) {
    return `
<!DOCTYPE html>
<html>
<head>
    <title>Style Audit Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .summary { background: #f5f5f5; padding: 15px; border-radius: 5px; }
        .critical { color: #d32f2f; }
        .moderate { color: #f57c00; }
        .minor { color: #388e3c; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <h1>Style Audit Report</h1>
    <div class="summary">
        <h2>Summary</h2>
        ${results.comparisons && results.comparisons.cdnVsPostcss ? 
          this.auditor.createSummaryText(results.comparisons.cdnVsPostcss).replace(/\n/g, '<br>') : 
          'No comparison data available'
        }
    </div>
    
    ${results.report && results.report.recommendations ? `
    <h2>Recommendations</h2>
    <ul>
        ${results.report.recommendations.map(rec => 
          `<li class="${rec.priority === 'high' ? 'critical' : 'moderate'}">${rec.message}</li>`
        ).join('')}
    </ul>
    ` : ''}
    
    <p><em>Generated on ${new Date().toLocaleString()}</em></p>
</body>
</html>
    `;
  }

  /**
   * Utility function to wait
   */
  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Quick audit for development
   */
  quickAudit() {
    console.log('⚡ Running quick style audit...');
    
    const postcssStyles = this.auditor.captureStyles([
      'header', 'main', 'section', 'footer',
      'h1', 'h2', 'h3', 'button', 'input'
    ], 'postcss');
    
    console.log(`📊 Captured ${postcssStyles.styles.size} elements`);
    console.log('✅ Quick audit complete');
    
    return postcssStyles;
  }
}

// Global instance
window.AuditRunner = AuditRunner;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AuditRunner;
}
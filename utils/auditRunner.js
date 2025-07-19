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
    }
  }

  /**
   * Utility function to wait
   */
  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Global instance
window.AuditRunner = AuditRunner;
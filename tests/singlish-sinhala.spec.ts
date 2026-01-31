import { test, expect } from '@playwright/test';

/**
 * Data extracted from your Excel file.
 * Total scenarios: 32 Positive Functional test cases
 */
const testData = [
  { id: 'Pos_Fun_0001', name: 'Convert a short daily greeting phrase', input: 'oyaata kohomadha?', expected: 'ඔයාට කොහොමද?' },
  { id: 'Pos_Fun_0002', name: 'Convert simple greeting', input: 'suba udhaasanak', expected: 'සුබ උදාසනක්' },
  { id: 'Pos_Fun_0003', name: 'Convert question about time', input: 'velava kiyeda', expected: 'වෙලාව කියෙද?' },
  { id: 'Pos_Fun_0004', name: 'Convert polite request', input: 'Karuna karala mata kiyanna', expected: 'කරුණා කරළ මට කියන්න' },
  { id: 'Pos_Fun_0005', name: 'Convert question with embedded English', input: 'oyaa book eka kiyevvadha', expected: 'ඔයා book එක කියෙව්වද' },
  { id: 'Pos_Fun_0006', name: 'Convert command/instruction', input: 'methanata enna', expected: 'මෙතනට එන්න' },
  { id: 'Pos_Fun_0007', name: 'Convert future tense statement', input: 'mama heta yanavaa', expected: 'මම හෙට යන්නවා' },
  { id: 'Pos_Fun_0008', name: 'Convert compound sentence', input: 'Mama gedara yanavaa', expected: 'මම ගෙඩර යනවා' },
  { id: 'Pos_Fun_0009', name: 'Convert possessive statement', input: 'mage phone eka kohedha?', expected: 'mage phone එක කොහෙද?' },
  { id: 'Pos_Fun_0010', name: 'Convert expression with sentence', input: 'mama hari lassanayi', expected: 'මම හරි ලස්සනයි' },
  { id: 'Pos_Fun_0011', name: 'Real time conversion feedback', input: 'mama tea bonnavaa', expected: 'මම tea බොන්නවා' },
  { id: 'Pos_Fun_0012', name: 'Convert exclamatory statement', input: 'ai mokkadha methanna !', expected: 'ඇයි මොක්කද මෙතන !' },
  { id: 'Pos_Fun_0013', name: 'Convert polite request', input: 'Mata kamak nae', expected: 'මට කමක් නෑ' },
  { id: 'Pos_Fun_0014', name: 'Convert statement with numbers', input: 'mata rupiyel 500 onea', expected: 'මට රුපියෙල් 500 ඔනේ' },
  { id: 'Pos_Fun_0015', name: 'Convert comparative statement', input: 'mee eka ekata vadaa hodhayi', expected: 'මේ එක එකට වඩා හොදයි' },
  { id: 'Pos_Fun_0016', name: 'Convert polite request with mixed English', input: 'Machan mata heta presention eka thiyenavaa,slides tika email ekak vidihata evanna puLuvan', expected: 'මචන් මට හෙට presentation එක තියෙනවා,slides ටික email එකක් විදිහට එවන්න පුළුවන්' },
  { id: 'Pos_Fun_0017', name: 'Convert polite request with formal tone', input: 'Sir heta presentation eka thiyenavaa,slides tike 10 am kalin email karanna puluvandha?mama review karala team ekata forward onea.karunakarala help ekak karanna', expected: 'Sir හෙට presentation එක තියෙනවා,slides ටිකෙ 10 am කලින් email කරන්න පුලුවන්ද?මම review කරල team එකට forward ඔනේ.කරුනකරල help එකක් කරන්න' },
  { id: 'Pos_Fun_0018', name: 'Convert polite business request', input: 'bro mata client meeting ekak thiyanavaa,invoice eka today send karanna puluvandha?mama lunch kalin customer t evanna onea', expected: 'bro මට client meeting එකක් තියනවා,invoice එක today send කරන්න පුළුවන්ද?මම lunch කලින් customer t එවන්න ඔනේ' },
  { id: 'Pos_Fun_0019', name: 'Convert polite request with proposal', input: 'aiyaa mata client proposal eka submit karanna onea,oyata puluvandha pricing details tika today confirm karala whatsapp walin evanna?', expected: 'අයියෙ මට client proposal එක submit කරන්න ඔනේ,ඔයට පුලුවන්ද pricing details ටික today confirm කරලා whatsapp වලින් එවන්න' },
  { id: 'Pos_Fun_0020', name: 'Convert polite request with food description', input: 'Amma adha special lunch piliyala kalaa rice,chicken curry,sambol okkoma lassnata ,mama hari sathutin hitiyaa', expected: 'අම්ම අද special lunch පිලියල කලා rice,chicken curry,සම්බොල් ඔක්කොම ලස්ස්නට ,මම හරි සතුටින් හිටියා' },
  { id: 'Pos_Fun_0021', name: 'Convert polite request with cake description', input: 'Amma adha cake bake karala ,chocolate flavor hari taste unaa,family eke okkoma kaalaa podi photo ekak gaththaa', expected: 'අම්ම අද cake bake කරල ,chocolate flavor හරි taste උනා,family eke ඔක්කොම කාලා පොඩි photo එකක් ගත්තා' },
  { id: 'Pos_Fun_0022', name: 'Convert future plan statement', input: 'Heta api movie ekak balamu', expected: 'හෙට අපි movie එකක් බලමු' },
  { id: 'Pos_Fun_0023', name: 'Convert office statement', input: 'Mama office yanavaa', expected: 'මම office යනවා' },
  { id: 'Pos_Fun_0024', name: 'Convert polite request small task', input: 'Oyata podi deyak karanna puluvandha ?', expected: 'ඔයට පොඩි ඩෙයක් කරන්න පුලුවන්ද?' },
  { id: 'Pos_Fun_0025', name: 'Convert location question', input: 'railway station eka koheedha?', expected: 'railway station එක කොහේද?' },
  { id: 'Pos_Fun_0026', name: 'Convert compliment statement', input: 'oya rathu paara saariyata lassanayi', expected: 'ඔය රතු පාර සාරියට ලස්සනයි' },
  { id: 'Pos_Fun_0027', name: 'Mixed-language lexical ambiguity (man)', input: 'man gedara yanavaa', expected: 'මන් ගෙදර යනවා' },
  { id: 'Pos_Fun_0028', name: 'Mixed-language lexical ambiguity (man future)', input: 'man heta oyalage gedara enava', expected: 'මන් හෙට ඔයලගෙ ගෙඩර එනවා' },
  { id: 'Pos_Fun_0029', name: 'Mixed-language lexical ambiguity with food', input: 'man heta oyalage gedara enava mata kema monavaa hari lesthi karala thiyanna', expected: 'මන් හෙට ඔයලගෙ ගෙඩර එනව මට කෑම මොනවා හරි ලෑස්ති කරල තියන්න' },
  { id: 'Pos_Fun_0030', name: 'Convert gaming statement', input: 'bro mata adha online game play karalaa, level eka complete unaa🎮, sathutuyi hari godak, namuth laptop poddak slow unaa.', expected: 'bro මට අද online game play කරලා, level එක complete උනා🎮, සතුටුයි හරි ගොඩක්, නමුත් laptop පොඩ්ඩක් slow උනා' },
  { id: 'Pos_Fun_0031', name: 'Convert polite request to teacher', input: 'api meka heta ape sirta kiyamuda', expected: 'අපි මෙක හෙට ape සිර්ට කියමුඩ' },
  { id: 'Pos_Fun_0032', name: 'Convert daily activity question', input: 'api mokadha adha karanne', expected: 'අපි මොකද අද කරන්නේ' },
];

test.describe('IT3040 Assignment: Swift Translator Automation', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the translator and wait for it to load
    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });
  });

  for (const scenario of testData) {
    test(`${scenario.id}: ${scenario.name}`, async ({ page }, testInfo) => {
      // 1. Identify Input and Output fields
      const inputArea = page.getByPlaceholder("Input Your Singlish Text Here.");
      const outputArea = page.locator('div.bg-slate-50');

      // 2. Perform actions
      await inputArea.fill(scenario.input);

      // 3. Wait for real-time conversion
      await page.waitForTimeout(1000);

      // 4. Capture Actual Output
      const actualOutput = await outputArea.innerText();

      // 5. Log for Excel Reporting
      console.log(`TC ID: ${scenario.id}`);
      console.log(`Actual Output: ${actualOutput}`);

      // 6. Attach to report for easy copying
      testInfo.annotations.push({
        type: 'Actual Output (Sinhala)',
        description: actualOutput
      });

      // 7. Verify Result (Assertions)
      await expect(outputArea).toHaveText(scenario.expected);
    });
  }

}); 
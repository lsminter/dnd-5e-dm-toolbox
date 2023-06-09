import Attribute from "./characterAttribute.js";
import CharacterText from "./characterText.js";
import SavingThrows from "./characterSavingThrows.js";
import CharacterStats from "./characterStats.js";
import DeathSaves from "./deathSaves.js";
import HitDice from "./hitDice.js";
import AttAndSpells from "./attacksAndSpellcasting.js";
import CharacterSpells from "./characterSpells.js";
import SpellNames from "./spellNames.js";
import CharacterCantrips from "./characterCantrips.js";

import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { decode } from 'base64-arraybuffer'

export default function FullCharacterSheet({
  nameValue,
  description,
  background,
  characterClass,
  race,
  alignment,
  pc,
  pc_id,
  b64,
}) {

  const user = useUser();
  const supabase = useSupabaseClient();
  const ref = useRef(null);

  const [pcs, setPcs] = useState([]);

  useEffect(() => {
    const fetchPcs = async () => {
      if(user){
        const { data: pcs, error } = await supabase
          .from('pc_characters')
          .select(('*'))
          .eq('id', user.id)
          .eq('pc_name', pc)
          
          setPcs(pcs)
        }
      }
      fetchPcs()
  }, [user, supabase, pc])
  
  const [characterName, setCharacterName] = useState(nameValue);
  const [characterDescription, setCharacterDescription] = useState(description);
  const [characterBackground, setCharacterBackground] = useState(background);
  const [characterCharacterClass, setCharacterCharacterClass] = useState(characterClass);
  const [characterRace, setCharacterRace] = useState(race);
  const [characterAlignment, setCharacterAlignment] = useState(alignment);
  const [characterExperience, setCharacterExperience] = useState("");
  const [characterLevel, setCharacterLevel] = useState("");
  const [characterSpellLevel, setCharacterSpellLevel] = useState("");
  const [characterInspiration, setCharacterInspiration] = useState("");
  const [characterProficiencyBonus, setCharacterProficiencyBonus] = useState("");
  const [characterStrength, setCharacterStrength] = useState("");
  const [characterStrengthModifier, setCharacterStrengthModifier] = useState("");
  const [characterStrengthSave, setCharacterStrengthSave] = useState("");
  const [characterStrengthSaveChecked, setCharacterStrengthSaveChecked] = useState(false);
  const [characterDexterity, setCharacterDexterity] = useState("");
  const [characterDexterityModifier, setCharacterDexterityModifier] = useState("");
  const [characterDexteritySave, setCharacterDexteritySave] = useState("");
  const [characterDexteritySaveChecked, setCharacterDexteritySaveChecked] = useState(false);
  const [characterConstitution, setCharacterConstitution] = useState("");
  const [characterConstitutionModifier, setCharacterConstitutionModifier] = useState("");
  const [characterConstitutionSave, setCharacterConstitutionSave] = useState("");
  const [characterConstitutionSaveChecked, setCharacterConstitutionSaveChecked] = useState(false);
  const [characterIntelligence, setCharacterIntelligence] = useState("");
  const [characterIntelligenceModifier, setCharacterIntelligenceModifier] = useState("");
  const [characterIntelligenceSave, setCharacterIntelligenceSave] = useState("");
  const [characterIntelligenceSaveChecked, setCharacterIntelligenceSaveChecked] = useState(false);
  const [characterWisdom, setCharacterWisdom] = useState("");
  const [characterWisdomModifier, setCharacterWisdomModifier] = useState("");
  const [characterWisdomSave, setCharacterWisdomSave] = useState("");
  const [characterWisdomSaveChecked, setCharacterWisdomSaveChecked] = useState(false);
  const [characterCharisma, setCharacterCharisma] = useState("");
  const [characterCharismaModifier, setCharacterCharismaModifier] = useState("");
  const [characterCharismaSave, setCharacterCharismaSave] = useState("");
  const [characterCharismaSaveChecked, setCharacterCharismaSaveChecked] = useState(false);
  const [characterAcrobatics, setCharacterAcrobatics] = useState("");
  const [characterAcrobaticsChecked, setCharacterAcrobaticsChecked] = useState(false);
  const [characterAnimalHandling, setCharacterAnimalHandling] = useState("");
  const [characterAnimalHandlingChecked, setCharacterAnimalHandlingChecked] = useState(false);
  const [characterArcana, setCharacterArcana] = useState("");
  const [characterArcanaChecked, setCharacterArcanaChecked] = useState(false);
  const [characterAthletics, setCharacterAthletics] = useState("");
  const [characterAthleticsChecked, setCharacterAthleticsChecked] = useState(false);
  const [characterDeception, setCharacterDeception] = useState("");
  const [characterDeceptionChecked, setCharacterDeceptionChecked] = useState(false);
  const [characterHistory, setCharacterHistory] = useState("");
  const [characterHistoryChecked, setCharacterHistoryChecked] = useState(false);
  const [characterInsight, setCharacterInsight] = useState("");
  const [characterInsightChecked, setCharacterInsightChecked] = useState(false);
  const [characterIntimidation, setCharacterIntimidation] = useState("");
  const [characterIntimidationChecked, setCharacterIntimidationChecked] = useState(false);
  const [characterInvestigation, setCharacterInvestigation] = useState("");
  const [characterInvestigationChecked, setCharacterInvestigationChecked] = useState(false);
  const [characterMedicine, setCharacterMedicine] = useState("");
  const [characterMedicineChecked, setCharacterMedicineChecked] = useState(false);
  const [characterNature, setCharacterNature] = useState("");
  const [characterNatureChecked, setCharacterNatureChecked] = useState(false);
  const [characterPerception, setCharacterPerception] = useState("");
  const [characterPerceptionChecked, setCharacterPerceptionChecked] = useState(false);
  const [characterPerformance, setCharacterPerformance] = useState("");
  const [characterPerformanceChecked, setCharacterPerformanceChecked] = useState(false);
  const [characterPersuasion, setCharacterPersuasion] = useState("");
  const [characterPersuasionChecked, setCharacterPersuasionChecked] = useState(false);
  const [characterReligion, setCharacterReligion] = useState("");
  const [characterReligionChecked, setCharacterReligionChecked] = useState(false);
  const [characterSleightOfHand, setCharacterSleightOfHand] = useState("");
  const [characterSleightOfHandChecked, setCharacterSleightOfHandChecked] = useState(false);
  const [characterStealth, setCharacterStealth] = useState("");
  const [characterStealthChecked, setCharacterStealthChecked] = useState(false);
  const [characterSurvival, setCharacterSurvival] = useState("");
  const [characterSurvivalChecked, setCharacterSurvivalChecked] = useState(false);
  const [characterPassiveWisdom, setCharacterPassiveWisdom] = useState("");
  const [characterMaxHP, setCharacterMaxHP] = useState("");
  const [characterCurrentHP, setCharacterCurrentHP] = useState("");
  const [characterTempHP, setCharacterTempHP] = useState("");
  const [characterAC, setCharacterAC] = useState("");
  const [characterInitiative, setCharacterInitiative] = useState("");
  const [characterSpeed, setCharacterSpeed] = useState("");
  const [characterHitDice1, setCharacterHitDice1] = useState("");
  const [characterHitDice2, setCharacterHitDice2] = useState("");
  const [characterAttName1, setCharacterAttName1] = useState("");
  const [characterAttBonus1, setCharacterAttBonus1] = useState("");
  const [characterAttDamage1, setCharacterAttDamage1] = useState("");
  const [characterAttName2, setCharacterAttName2] = useState("");
  const [characterAttBonus2, setCharacterAttBonus2] = useState("");
  const [characterAttDamage2, setCharacterAttDamage2] = useState("");
  const [characterAttName3, setCharacterAttName3] = useState("");
  const [characterAttBonus3, setCharacterAttBonus3] = useState("");
  const [characterAttDamage3, setCharacterAttDamage3] = useState("");
  const [characterAttackAndSpellsTextArea, setCharacterAttackAndSpellsTextArea] = useState("");
  const [characterEquipment, setCharacterEquipment] = useState("");
  const [characterProficienciesAndLanguages, setCharacterProficienciesAndLanguages] = useState("");
  const [characterPersonalityTraits, setCharacterPersonalityTraits] = useState("");
  const [characterIdeals, setCharacterIdeals] = useState("");
  const [characterBonds, setCharacterBonds] = useState("");
  const [characterFlaws, setCharacterFlaws] = useState("");
  const [characterFeaturesAndTraits, setCharacterFeaturesAndTraits] = useState("");
  const [characterAge, setCharacterAge] = useState("");
  const [characterHeight, setCharacterHeight] = useState("");
  const [characterWeight, setCharacterWeight] = useState("");
  const [characterEyes, setCharacterEyes] = useState("");
  const [characterSkin, setCharacterSkin] = useState("");
  const [characterHair, setCharacterHair] = useState("");
  const [characterAlliesAndOrganizations, setCharacterAlliesAndOrganizations] = useState("");
  const [characterAdditionalFeaturesAndTraits, setCharacterAdditionalFeaturesAndTraits] = useState("");
  const [characterTreasures, setCharacterTreasures] = useState("");
  const [characterSpellAbility, setCharacterSpellAbility] = useState("");
  const [characterSpellSaveDC, setCharacterSpellSaveDC] = useState("");
  const [characterSpellAttackBonus, setCharacterSpellAttackBonus] = useState("");
  const [characterCantripNumber, setCharacterCantripNumber] = useState("");
  const [characterCantrip1, setCharacterCantrip1] = useState("");
  const [characterCantrip1Checked, setCharacterCantrip1Checked] = useState(false);
  const [characterCantrip2, setCharacterCantrip2] = useState("");
  const [characterCantrip2Checked, setCharacterCantrip2Checked] = useState(false);
  const [characterCantrip3, setCharacterCantrip3] = useState("");
  const [characterCantrip3Checked, setCharacterCantrip3Checked] = useState(false);
  const [characterCantrip4, setCharacterCantrip4] = useState("");
  const [characterCantrip4Checked, setCharacterCantrip4Checked] = useState(false);
  const [characterCantrip5, setCharacterCantrip5] = useState("");
  const [characterCantrip5Checked, setCharacterCantrip5Checked] = useState(false);
  const [characterCantrip6, setCharacterCantrip6] = useState("");
  const [characterCantrip6Checked, setCharacterCantrip6Checked] = useState(false);
  const [characterCantrip7, setCharacterCantrip7] = useState("");
  const [characterCantrip7Checked, setCharacterCantrip7Checked] = useState(false);
  const [characterCantrip8, setCharacterCantrip8] = useState("");
  const [characterCantrip8Checked, setCharacterCantrip8Checked] = useState(false);
  const [spellLevel1Total, setSpellLevel1Total] = useState("");
  const [spellLevel1Used, setSpellLevel1Used] = useState("");
  const [characterSpellLevel1Spell1, setCharacterSpellLevel1Spell1] = useState("");
  const [characterSpellLevel1Spell1Checked, setCharacterSpellLevel1Spell1Checked] = useState(false);
  const [characterSpellLevel1Spell2, setCharacterSpellLevel1Spell2] = useState("");
  const [characterSpellLevel1Spell2Checked, setCharacterSpellLevel1Spell2Checked] = useState(false);
  const [characterSpellLevel1Spell3, setCharacterSpellLevel1Spell3] = useState("");
  const [characterSpellLevel1Spell3Checked, setCharacterSpellLevel1Spell3Checked] = useState(false);
  const [characterSpellLevel1Spell4, setCharacterSpellLevel1Spell4] = useState("");
  const [characterSpellLevel1Spell4Checked, setCharacterSpellLevel1Spell4Checked] = useState(false);
  const [characterSpellLevel1Spell5, setCharacterSpellLevel1Spell5] = useState("");
  const [characterSpellLevel1Spell5Checked, setCharacterSpellLevel1Spell5Checked] = useState(false);
  const [characterSpellLevel1Spell6, setCharacterSpellLevel1Spell6] = useState("");
  const [characterSpellLevel1Spell6Checked, setCharacterSpellLevel1Spell6Checked] = useState(false);
  const [characterSpellLevel1Spell7, setCharacterSpellLevel1Spell7] = useState("");
  const [characterSpellLevel1Spell7Checked, setCharacterSpellLevel1Spell7Checked] = useState(false);
  const [characterSpellLevel1Spell8, setCharacterSpellLevel1Spell8] = useState("");
  const [characterSpellLevel1Spell8Checked, setCharacterSpellLevel1Spell8Checked] = useState(false);
  const [characterSpellLevel1Spell9, setCharacterSpellLevel1Spell9] = useState("");
  const [characterSpellLevel1Spell9Checked, setCharacterSpellLevel1Spell9Checked] = useState(false);
  const [characterSpellLevel1Spell10, setCharacterSpellLevel1Spell10] = useState("");
  const [characterSpellLevel1Spell10Checked, setCharacterSpellLevel1Spell10Checked] = useState(false);
  const [characterSpellLevel1Spell11, setCharacterSpellLevel1Spell11] = useState("");
  const [characterSpellLevel1Spell11Checked, setCharacterSpellLevel1Spell11Checked] = useState(false);
  const [characterSpellLevel1Spell12, setCharacterSpellLevel1Spell12] = useState("");
  const [characterSpellLevel1Spell12Checked, setCharacterSpellLevel1Spell12Checked] = useState(false);
  const [characterSpellLevel1Spell13, setCharacterSpellLevel1Spell13] = useState("");
  const [characterSpellLevel1Spell13Checked, setCharacterSpellLevel1Spell13Checked] = useState(false);
  const [spellLevel2Total, setSpellLevel2Total] = useState("");
  const [spellLevel2Used, setSpellLevel2Used] = useState("");
  const [characterSpellLevel2Spell1, setCharacterSpellLevel2Spell1] = useState("");
  const [characterSpellLevel2Spell1Checked, setCharacterSpellLevel2Spell1Checked] = useState(false);
  const [characterSpellLevel2Spell2, setCharacterSpellLevel2Spell2] = useState("");
  const [characterSpellLevel2Spell2Checked, setCharacterSpellLevel2Spell2Checked] = useState(false);
  const [characterSpellLevel2Spell3, setCharacterSpellLevel2Spell3] = useState("");
  const [characterSpellLevel2Spell3Checked, setCharacterSpellLevel2Spell3Checked] = useState(false);
  const [characterSpellLevel2Spell4, setCharacterSpellLevel2Spell4] = useState("");
  const [characterSpellLevel2Spell4Checked, setCharacterSpellLevel2Spell4Checked] = useState(false);
  const [characterSpellLevel2Spell5, setCharacterSpellLevel2Spell5] = useState("");
  const [characterSpellLevel2Spell5Checked, setCharacterSpellLevel2Spell5Checked] = useState(false);
  const [characterSpellLevel2Spell6, setCharacterSpellLevel2Spell6] = useState("");
  const [characterSpellLevel2Spell6Checked, setCharacterSpellLevel2Spell6Checked] = useState(false);
  const [characterSpellLevel2Spell7, setCharacterSpellLevel2Spell7] = useState("");
  const [characterSpellLevel2Spell7Checked, setCharacterSpellLevel2Spell7Checked] = useState(false);
  const [characterSpellLevel2Spell8, setCharacterSpellLevel2Spell8] = useState("");
  const [characterSpellLevel2Spell8Checked, setCharacterSpellLevel2Spell8Checked] = useState(false);
  const [characterSpellLevel2Spell9, setCharacterSpellLevel2Spell9] = useState("");
  const [characterSpellLevel2Spell9Checked, setCharacterSpellLevel2Spell9Checked] = useState(false);
  const [characterSpellLevel2Spell10, setCharacterSpellLevel2Spell10] = useState("");
  const [characterSpellLevel2Spell10Checked, setCharacterSpellLevel2Spell10Checked] = useState(false);
  const [characterSpellLevel2Spell11, setCharacterSpellLevel2Spell11] = useState("");
  const [characterSpellLevel2Spell11Checked, setCharacterSpellLevel2Spell11Checked] = useState(false);
  const [characterSpellLevel2Spell12, setCharacterSpellLevel2Spell12] = useState("");
  const [characterSpellLevel2Spell12Checked, setCharacterSpellLevel2Spell12Checked] = useState(false);
  const [characterSpellLevel2Spell13, setCharacterSpellLevel2Spell13] = useState("");
  const [characterSpellLevel2Spell13Checked, setCharacterSpellLevel2Spell13Checked] = useState(false);
  const [spellLevel3Total, setSpellLevel3Total] = useState("");
  const [spellLevel3Used, setSpellLevel3Used] = useState("");
  const [characterSpellLevel3Spell1, setCharacterSpellLevel3Spell1] = useState("");
  const [characterSpellLevel3Spell1Checked, setCharacterSpellLevel3Spell1Checked] = useState(false);
  const [characterSpellLevel3Spell2, setCharacterSpellLevel3Spell2] = useState("");
  const [characterSpellLevel3Spell2Checked, setCharacterSpellLevel3Spell2Checked] = useState(false);
  const [characterSpellLevel3Spell3, setCharacterSpellLevel3Spell3] = useState("");
  const [characterSpellLevel3Spell3Checked, setCharacterSpellLevel3Spell3Checked] = useState(false);
  const [characterSpellLevel3Spell4, setCharacterSpellLevel3Spell4] = useState("");
  const [characterSpellLevel3Spell4Checked, setCharacterSpellLevel3Spell4Checked] = useState(false);
  const [characterSpellLevel3Spell5, setCharacterSpellLevel3Spell5] = useState("");
  const [characterSpellLevel3Spell5Checked, setCharacterSpellLevel3Spell5Checked] = useState(false);
  const [characterSpellLevel3Spell6, setCharacterSpellLevel3Spell6] = useState("");
  const [characterSpellLevel3Spell6Checked, setCharacterSpellLevel3Spell6Checked] = useState(false);
  const [characterSpellLevel3Spell7, setCharacterSpellLevel3Spell7] = useState("");
  const [characterSpellLevel3Spell7Checked, setCharacterSpellLevel3Spell7Checked] = useState(false);
  const [characterSpellLevel3Spell8, setCharacterSpellLevel3Spell8] = useState("");
  const [characterSpellLevel3Spell8Checked, setCharacterSpellLevel3Spell8Checked] = useState(false);
  const [characterSpellLevel3Spell9, setCharacterSpellLevel3Spell9] = useState("");
  const [characterSpellLevel3Spell9Checked, setCharacterSpellLevel3Spell9Checked] = useState(false);
  const [characterSpellLevel3Spell10, setCharacterSpellLevel3Spell10] = useState("");
  const [characterSpellLevel3Spell10Checked, setCharacterSpellLevel3Spell10Checked] = useState(false);
  const [characterSpellLevel3Spell11, setCharacterSpellLevel3Spell11] = useState("");
  const [characterSpellLevel3Spell11Checked, setCharacterSpellLevel3Spell11Checked] = useState(false);
  const [characterSpellLevel3Spell12, setCharacterSpellLevel3Spell12] = useState("");
  const [characterSpellLevel3Spell12Checked, setCharacterSpellLevel3Spell12Checked] = useState(false);
  const [characterSpellLevel3Spell13, setCharacterSpellLevel3Spell13] = useState("");
  const [characterSpellLevel3Spell13Checked, setCharacterSpellLevel3Spell13Checked] = useState(false);
  const [spellLevel4Total, setSpellLevel4Total] = useState("");
  const [spellLevel4Used, setSpellLevel4Used] = useState("");
  const [characterSpellLevel4Spell1, setCharacterSpellLevel4Spell1] = useState("");
  const [characterSpellLevel4Spell1Checked, setCharacterSpellLevel4Spell1Checked] = useState(false);
  const [characterSpellLevel4Spell2, setCharacterSpellLevel4Spell2] = useState("");
  const [characterSpellLevel4Spell2Checked, setCharacterSpellLevel4Spell2Checked] = useState(false);
  const [characterSpellLevel4Spell3, setCharacterSpellLevel4Spell3] = useState("");
  const [characterSpellLevel4Spell3Checked, setCharacterSpellLevel4Spell3Checked] = useState(false);
  const [characterSpellLevel4Spell4, setCharacterSpellLevel4Spell4] = useState("");
  const [characterSpellLevel4Spell4Checked, setCharacterSpellLevel4Spell4Checked] = useState(false);
  const [characterSpellLevel4Spell5, setCharacterSpellLevel4Spell5] = useState("");
  const [characterSpellLevel4Spell5Checked, setCharacterSpellLevel4Spell5Checked] = useState(false);
  const [characterSpellLevel4Spell6, setCharacterSpellLevel4Spell6] = useState("");
  const [characterSpellLevel4Spell6Checked, setCharacterSpellLevel4Spell6Checked] = useState(false);
  const [characterSpellLevel4Spell7, setCharacterSpellLevel4Spell7] = useState("");
  const [characterSpellLevel4Spell7Checked, setCharacterSpellLevel4Spell7Checked] = useState(false);
  const [characterSpellLevel4Spell8, setCharacterSpellLevel4Spell8] = useState("");
  const [characterSpellLevel4Spell8Checked, setCharacterSpellLevel4Spell8Checked] = useState(false);
  const [characterSpellLevel4Spell9, setCharacterSpellLevel4Spell9] = useState("");
  const [characterSpellLevel4Spell9Checked, setCharacterSpellLevel4Spell9Checked] = useState(false);
  const [characterSpellLevel4Spell10, setCharacterSpellLevel4Spell10] = useState("");
  const [characterSpellLevel4Spell10Checked, setCharacterSpellLevel4Spell10Checked] = useState(false);
  const [characterSpellLevel4Spell11, setCharacterSpellLevel4Spell11] = useState("");
  const [characterSpellLevel4Spell11Checked, setCharacterSpellLevel4Spell11Checked] = useState(false);
  const [characterSpellLevel4Spell12, setCharacterSpellLevel4Spell12] = useState("");
  const [characterSpellLevel4Spell12Checked, setCharacterSpellLevel4Spell12Checked] = useState(false);
  const [characterSpellLevel4Spell13, setCharacterSpellLevel4Spell13] = useState("");
  const [characterSpellLevel4Spell13Checked, setCharacterSpellLevel4Spell13Checked] = useState(false);
  const [spellLevel5Total, setSpellLevel5Total] = useState("");
  const [spellLevel5Used, setSpellLevel5Used] = useState("");
  const [characterSpellLevel5Spell1, setCharacterSpellLevel5Spell1] = useState("");
  const [characterSpellLevel5Spell1Checked, setCharacterSpellLevel5Spell1Checked] = useState(false);
  const [characterSpellLevel5Spell2, setCharacterSpellLevel5Spell2] = useState("");
  const [characterSpellLevel5Spell2Checked, setCharacterSpellLevel5Spell2Checked] = useState(false);
  const [characterSpellLevel5Spell3, setCharacterSpellLevel5Spell3] = useState("");
  const [characterSpellLevel5Spell3Checked, setCharacterSpellLevel5Spell3Checked] = useState(false);
  const [characterSpellLevel5Spell4, setCharacterSpellLevel5Spell4] = useState("");
  const [characterSpellLevel5Spell4Checked, setCharacterSpellLevel5Spell4Checked] = useState(false);
  const [characterSpellLevel5Spell5, setCharacterSpellLevel5Spell5] = useState("");
  const [characterSpellLevel5Spell5Checked, setCharacterSpellLevel5Spell5Checked] = useState(false);
  const [characterSpellLevel5Spell6, setCharacterSpellLevel5Spell6] = useState("");
  const [characterSpellLevel5Spell6Checked, setCharacterSpellLevel5Spell6Checked] = useState(false);
  const [characterSpellLevel5Spell7, setCharacterSpellLevel5Spell7] = useState("");
  const [characterSpellLevel5Spell7Checked, setCharacterSpellLevel5Spell7Checked] = useState(false);
  const [characterSpellLevel5Spell8, setCharacterSpellLevel5Spell8] = useState("");
  const [characterSpellLevel5Spell8Checked, setCharacterSpellLevel5Spell8Checked] = useState(false);
  const [spellLevel6Total, setSpellLevel6Total] = useState("");
  const [spellLevel6Used, setSpellLevel6Used] = useState("");
  const [characterSpellLevel6Spell1, setCharacterSpellLevel6Spell1] = useState("");
  const [characterSpellLevel6Spell1Checked, setCharacterSpellLevel6Spell1Checked] = useState(false);
  const [characterSpellLevel6Spell2, setCharacterSpellLevel6Spell2] = useState("");
  const [characterSpellLevel6Spell2Checked, setCharacterSpellLevel6Spell2Checked] = useState(false);
  const [characterSpellLevel6Spell3, setCharacterSpellLevel6Spell3] = useState("");
  const [characterSpellLevel6Spell3Checked, setCharacterSpellLevel6Spell3Checked] = useState(false);
  const [characterSpellLevel6Spell4, setCharacterSpellLevel6Spell4] = useState("");
  const [characterSpellLevel6Spell4Checked, setCharacterSpellLevel6Spell4Checked] = useState(false);
  const [characterSpellLevel6Spell5, setCharacterSpellLevel6Spell5] = useState("");
  const [characterSpellLevel6Spell5Checked, setCharacterSpellLevel6Spell5Checked] = useState(false);
  const [characterSpellLevel6Spell6, setCharacterSpellLevel6Spell6] = useState("");
  const [characterSpellLevel6Spell6Checked, setCharacterSpellLevel6Spell6Checked] = useState(false);
  const [characterSpellLevel6Spell7, setCharacterSpellLevel6Spell7] = useState("");
  const [characterSpellLevel6Spell7Checked, setCharacterSpellLevel6Spell7Checked] = useState(false);
  const [characterSpellLevel6Spell8, setCharacterSpellLevel6Spell8] = useState("");
  const [characterSpellLevel6Spell8Checked, setCharacterSpellLevel6Spell8Checked] = useState(false);
  const [spellLevel7Total, setSpellLevel7Total] = useState("");
  const [spellLevel7Used, setSpellLevel7Used] = useState("");
  const [characterSpellLevel7Spell1, setCharacterSpellLevel7Spell1] = useState("");
  const [characterSpellLevel7Spell1Checked, setCharacterSpellLevel7Spell1Checked] = useState(false);
  const [characterSpellLevel7Spell2, setCharacterSpellLevel7Spell2] = useState("");
  const [characterSpellLevel7Spell2Checked, setCharacterSpellLevel7Spell2Checked] = useState(false);
  const [characterSpellLevel7Spell3, setCharacterSpellLevel7Spell3] = useState("");
  const [characterSpellLevel7Spell3Checked, setCharacterSpellLevel7Spell3Checked] = useState(false);
  const [characterSpellLevel7Spell4, setCharacterSpellLevel7Spell4] = useState("");
  const [characterSpellLevel7Spell4Checked, setCharacterSpellLevel7Spell4Checked] = useState(false);
  const [characterSpellLevel7Spell5, setCharacterSpellLevel7Spell5] = useState("");
  const [characterSpellLevel7Spell5Checked, setCharacterSpellLevel7Spell5Checked] = useState(false);
  const [characterSpellLevel7Spell6, setCharacterSpellLevel7Spell6] = useState("");
  const [characterSpellLevel7Spell6Checked, setCharacterSpellLevel7Spell6Checked] = useState(false);
  const [characterSpellLevel7Spell7, setCharacterSpellLevel7Spell7] = useState("");
  const [characterSpellLevel7Spell7Checked, setCharacterSpellLevel7Spell7Checked] = useState(false);
  const [characterSpellLevel7Spell8, setCharacterSpellLevel7Spell8] = useState("");
  const [characterSpellLevel7Spell8Checked, setCharacterSpellLevel7Spell8Checked] = useState(false);
  const [spellLevel8Total, setSpellLevel8Total] = useState("");
  const [spellLevel8Used, setSpellLevel8Used] = useState("");
  const [characterSpellLevel8Spell1, setCharacterSpellLevel8Spell1] = useState("");
  const [characterSpellLevel8Spell1Checked, setCharacterSpellLevel8Spell1Checked] = useState(false);
  const [characterSpellLevel8Spell2, setCharacterSpellLevel8Spell2] = useState("");
  const [characterSpellLevel8Spell2Checked, setCharacterSpellLevel8Spell2Checked] = useState(false);
  const [characterSpellLevel8Spell3, setCharacterSpellLevel8Spell3] = useState("");
  const [characterSpellLevel8Spell3Checked, setCharacterSpellLevel8Spell3Checked] = useState(false);
  const [characterSpellLevel8Spell4, setCharacterSpellLevel8Spell4] = useState("");
  const [characterSpellLevel8Spell4Checked, setCharacterSpellLevel8Spell4Checked] = useState(false);
  const [characterSpellLevel8Spell5, setCharacterSpellLevel8Spell5] = useState("");
  const [characterSpellLevel8Spell5Checked, setCharacterSpellLevel8Spell5Checked] = useState(false);
  const [characterSpellLevel8Spell6, setCharacterSpellLevel8Spell6] = useState("");
  const [characterSpellLevel8Spell6Checked, setCharacterSpellLevel8Spell6Checked] = useState(false);
  const [characterSpellLevel8Spell7, setCharacterSpellLevel8Spell7] = useState("");
  const [characterSpellLevel8Spell7Checked, setCharacterSpellLevel8Spell7Checked] = useState(false);
  const [characterSpellLevel8Spell8, setCharacterSpellLevel8Spell8] = useState("");
  const [characterSpellLevel8Spell8Checked, setCharacterSpellLevel8Spell8Checked] = useState(false);
  const [spellLevel9Total, setSpellLevel9Total] = useState("");
  const [spellLevel9Used, setSpellLevel9Used] = useState("");
  const [characterSpellLevel9Spell1, setCharacterSpellLevel9Spell1] = useState("");
  const [characterSpellLevel9Spell1Checked, setCharacterSpellLevel9Spell1Checked] = useState(false);
  const [characterSpellLevel9Spell2, setCharacterSpellLevel9Spell2] = useState("");
  const [characterSpellLevel9Spell2Checked, setCharacterSpellLevel9Spell2Checked] = useState(false);
  const [characterSpellLevel9Spell3, setCharacterSpellLevel9Spell3] = useState("");
  const [characterSpellLevel9Spell3Checked, setCharacterSpellLevel9Spell3Checked] = useState(false);
  const [characterSpellLevel9Spell4, setCharacterSpellLevel9Spell4] = useState("");
  const [characterSpellLevel9Spell4Checked, setCharacterSpellLevel9Spell4Checked] = useState(false);
  const [characterSpellLevel9Spell5, setCharacterSpellLevel9Spell5] = useState("");
  const [characterSpellLevel9Spell5Checked, setCharacterSpellLevel9Spell5Checked] = useState(false);
  const [characterSpellLevel9Spell6, setCharacterSpellLevel9Spell6] = useState("");
  const [characterSpellLevel9Spell6Checked, setCharacterSpellLevel9Spell6Checked] = useState(false);
  const [characterSpellLevel9Spell7, setCharacterSpellLevel9Spell7] = useState("");
  const [characterSpellLevel9Spell7Checked, setCharacterSpellLevel9Spell7Checked] = useState(false);
  const [characterSpellLevel9Spell8, setCharacterSpellLevel9Spell8] = useState("");
  const [characterSpellLevel9Spell8Checked, setCharacterSpellLevel9Spell8Checked] = useState(false);
  const [characterImage, setCharacterImage] = useState(undefined);
  const [bucketImage, setBucketImage] = useState(undefined);

  useEffect(() => {
    if(pcs[0]?.pc_data.name !== undefined){setCharacterName(pcs[0]?.pc_data.name)}
    if(pcs[0]?.pc_data.characterAppearance !== undefined){setCharacterDescription(pcs[0]?.pc_data.characterAppearance)}
    if(pcs[0]?.pc_data.background !== undefined){setCharacterBackground(pcs[0]?.pc_data.background)}
    if(pcs[0]?.pc_data.class !== undefined){setCharacterCharacterClass(pcs[0]?.pc_data.class)}
    if(pcs[0]?.pc_data.ac !== undefined){setCharacterAC(pcs[0]?.pc_data.ac)}
    if(pcs[0]?.pc_data.acrobatics !== undefined){setCharacterAcrobatics(pcs[0]?.pc_data.acrobatics)}
    if(pcs[0]?.pc_data.additionalFeaturesAndTraits !== undefined){setCharacterAdditionalFeaturesAndTraits(pcs[0]?.pc_data.additionalFeaturesAndTraits)}
    if(pcs[0]?.pc_data.alignment !== undefined){setCharacterAlignment(pcs[0]?.pc_data.alignment)}
    if(pcs[0]?.pc_data.animalHandling !== undefined){setCharacterAnimalHandling(pcs[0]?.pc_data.animalHandling)}
    if(pcs[0]?.pc_data.arcana !== undefined){setCharacterArcana(pcs[0]?.pc_data.arcana)}
    if(pcs[0]?.pc_data.age !== undefined){setCharacterAge(pcs[0]?.pc_data.age)}
    if(pcs[0]?.pc_data.alliesAndOrganizations !== undefined){setCharacterAlliesAndOrganizations(pcs[0]?.pc_data.alliesAndOrganizations)}
    if(pcs[0]?.pc_data.animalHandling !== undefined){setCharacterAnimalHandling(pcs[0]?.pc_data.animalHandling)}
    if(pcs[0]?.pc_data.arcana !== undefined){setCharacterArcana(pcs[0]?.pc_data.arcana)}
    if(pcs[0]?.pc_data.athletics !== undefined){setCharacterAthletics(pcs[0]?.pc_data.athletics)}
    if(pcs[0]?.pc_data.attBonus1 !== undefined){setCharacterAttBonus1(pcs[0]?.pc_data.attBonus1)}
    if(pcs[0]?.pc_data.attBonus2 !== undefined){setCharacterAttBonus2(pcs[0]?.pc_data.attBonus2)}
    if(pcs[0]?.pc_data.attBonus3 !== undefined){setCharacterAttBonus3(pcs[0]?.pc_data.attBonus3)}
    if(pcs[0]?.pc_data.attDmg1 !== undefined){setCharacterAttDamage1(pcs[0]?.pc_data.attDmg1)}
    if(pcs[0]?.pc_data.attDmg2 !== undefined){setCharacterAttDamage2(pcs[0]?.pc_data.attDmg2)}
    if(pcs[0]?.pc_data.attDmg3 !== undefined){setCharacterAttDamage3(pcs[0]?.pc_data.attDmg3)}
    if(pcs[0]?.pc_data.attName1 !== undefined){setCharacterAttName1(pcs[0]?.pc_data.attName1)}
    if(pcs[0]?.pc_data.attName2 !== undefined){setCharacterAttName2(pcs[0]?.pc_data.attName2)}
    if(pcs[0]?.pc_data.attName3 !== undefined){setCharacterAttName3(pcs[0]?.pc_data.attName3)}
    if(pcs[0]?.pc_data.attackAndSpellsTextArea !== undefined){setCharacterAttackAndSpellsTextArea(pcs[0]?.pc_data.attackAndSpellsTextArea)}
    if(pcs[0]?.pc_data.bonds !== undefined){setCharacterBonds(pcs[0]?.pc_data.bonds)}
    if(pcs[0]?.pc_data.cantrip1 !== undefined){setCharacterCantrip1(pcs[0]?.pc_data.cantrip1)}
    if(pcs[0]?.pc_data.cantrip2 !== undefined){setCharacterCantrip2(pcs[0]?.pc_data.cantrip2)}
    if(pcs[0]?.pc_data.cantrip3 !== undefined){setCharacterCantrip3(pcs[0]?.pc_data.cantrip3)}
    if(pcs[0]?.pc_data.cantrip4 !== undefined){setCharacterCantrip4(pcs[0]?.pc_data.cantrip4)}
    if(pcs[0]?.pc_data.cantrip5 !== undefined){setCharacterCantrip5(pcs[0]?.pc_data.cantrip5)}
    if(pcs[0]?.pc_data.cantrip6 !== undefined){setCharacterCantrip6(pcs[0]?.pc_data.cantrip6)}
    if(pcs[0]?.pc_data.cantrip7 !== undefined){setCharacterCantrip7(pcs[0]?.pc_data.cantrip7)}
    if(pcs[0]?.pc_data.cantrip8 !== undefined){setCharacterCantrip8(pcs[0]?.pc_data.cantrip8)}
    if(pcs[0]?.pc_data.cantripNumber !== undefined){setCharacterCantripNumber(pcs[0]?.pc_data.cantripNumber)}
    if(pcs[0]?.pc_data.characterAcrobaticsChecked !== undefined){setCharacterAcrobaticsChecked(pcs[0]?.pc_data.characterAcrobaticsChecked)}
    if(pcs[0]?.pc_data.characterAnimalHandlingChecked !== undefined){setCharacterAnimalHandlingChecked(pcs[0]?.pc_data.characterAnimalHandlingChecked)}
    if(pcs[0]?.pc_data.characterArcanaChecked !== undefined){setCharacterArcanaChecked(pcs[0]?.pc_data.characterArcanaChecked)}
    if(pcs[0]?.pc_data.characterAthleticsChecked !== undefined){setCharacterAthleticsChecked(pcs[0]?.pc_data.characterAthleticsChecked)}
    if(pcs[0]?.pc_data.characterCharismaSaveChecked !== undefined){setCharacterCharismaSaveChecked(pcs[0]?.pc_data.characterCharismaSaveChecked)}
    if(pcs[0]?.pc_data.characterConstitutionSaveChecked !== undefined){setCharacterConstitutionSaveChecked(pcs[0]?.pc_data.characterConstitutionSaveChecked)}
    if(pcs[0]?.pc_data.characterDeceptionChecked !== undefined){setCharacterDeceptionChecked(pcs[0]?.pc_data.characterDeceptionChecked)}
    if(pcs[0]?.pc_data.characterDexteritySaveChecked !== undefined){setCharacterDexteritySaveChecked(pcs[0]?.pc_data.characterDexteritySaveChecked)}
    if(pcs[0]?.pc_data.characterHistoryChecked !== undefined){setCharacterHistoryChecked(pcs[0]?.pc_data.characterHistoryChecked)}
    if(pcs[0]?.pc_data.characterImage !== undefined){setCharacterImage(pcs[0]?.pc_data.characterImage)}
    if(pcs[0]?.pc_data.characterInsightChecked !== undefined){setCharacterInsightChecked(pcs[0]?.pc_data.characterInsightChecked)}
    if(pcs[0]?.pc_data.characterIntelligenceSaveChecked !== undefined){setCharacterIntelligenceSaveChecked(pcs[0]?.pc_data.characterIntelligenceSaveChecked)}
    if(pcs[0]?.pc_data.characterIntimidationChecked !== undefined){setCharacterIntimidationChecked(pcs[0]?.pc_data.characterIntimidationChecked)}
    if(pcs[0]?.pc_data.characterInvestigationChecked !== undefined){setCharacterInvestigationChecked(pcs[0]?.pc_data.characterInvestigationChecked)}
    if(pcs[0]?.pc_data.characterMedicineChecked !== undefined){setCharacterMedicineChecked(pcs[0]?.pc_data.characterMedicineChecked)}
    if(pcs[0]?.pc_data.characterNatureChecked !== undefined){setCharacterNatureChecked(pcs[0]?.pc_data.characterNatureChecked)}
    if(pcs[0]?.pc_data.characterPerceptionChecked !== undefined){setCharacterPerceptionChecked(pcs[0]?.pc_data.characterPerceptionChecked)}
    if(pcs[0]?.pc_data.characterPerformanceChecked !== undefined){setCharacterPerformanceChecked(pcs[0]?.pc_data.characterPerformanceChecked)}
    if(pcs[0]?.pc_data.characterPersuasionChecked !== undefined){setCharacterPersuasionChecked(pcs[0]?.pc_data.characterPersuasionChecked)}
    if(pcs[0]?.pc_data.characterReligionChecked !== undefined){setCharacterReligionChecked(pcs[0]?.pc_data.characterReligionChecked)}
    if(pcs[0]?.pc_data.characterSleightOfHandChecked !== undefined){setCharacterSleightOfHandChecked(pcs[0]?.pc_data.characterSleightOfHandChecked)}
    if(pcs[0]?.pc_data.characterSpellLevel1Spell1Checked !== undefined){setCharacterSpellLevel1Spell1Checked(pcs[0]?.pc_data.characterSpellLevel1Spell1Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel1Spell2Checked !== undefined){setCharacterSpellLevel1Spell2Checked(pcs[0]?.pc_data.characterSpellLevel1Spell2Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel1Spell3Checked !== undefined){setCharacterSpellLevel1Spell3Checked(pcs[0]?.pc_data.characterSpellLevel1Spell3Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel1Spell4Checked !== undefined){setCharacterSpellLevel1Spell4Checked(pcs[0]?.pc_data.characterSpellLevel1Spell4Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel1Spell5Checked !== undefined){setCharacterSpellLevel1Spell5Checked(pcs[0]?.pc_data.characterSpellLevel1Spell5Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel1Spell6Checked !== undefined){setCharacterSpellLevel1Spell6Checked(pcs[0]?.pc_data.characterSpellLevel1Spell6Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel1Spell7Checked !== undefined){setCharacterSpellLevel1Spell7Checked(pcs[0]?.pc_data.characterSpellLevel1Spell7Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel1Spell8Checked !== undefined){setCharacterSpellLevel1Spell8Checked(pcs[0]?.pc_data.characterSpellLevel1Spell8Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel1Spell9Checked !== undefined){setCharacterSpellLevel1Spell9Checked(pcs[0]?.pc_data.characterSpellLevel1Spell9Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel1Spell10Checked !== undefined){setCharacterSpellLevel1Spell10Checked(pcs[0]?.pc_data.characterSpellLevel1Spell10Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel1Spell11Checked !== undefined){setCharacterSpellLevel1Spell11Checked(pcs[0]?.pc_data.characterSpellLevel1Spell11Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel1Spell12Checked !== undefined){setCharacterSpellLevel1Spell12Checked(pcs[0]?.pc_data.characterSpellLevel1Spell12Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel1Spell13Checked !== undefined){setCharacterSpellLevel1Spell13Checked(pcs[0]?.pc_data.characterSpellLevel1Spell13Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel2Spell1Checked !== undefined){setCharacterSpellLevel2Spell1Checked(pcs[0]?.pc_data.characterSpellLevel2Spell1Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel2Spell2Checked !== undefined){setCharacterSpellLevel2Spell2Checked(pcs[0]?.pc_data.characterSpellLevel2Spell2Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel2Spell3Checked !== undefined){setCharacterSpellLevel2Spell3Checked(pcs[0]?.pc_data.characterSpellLevel2Spell3Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel2Spell4Checked !== undefined){setCharacterSpellLevel2Spell4Checked(pcs[0]?.pc_data.characterSpellLevel2Spell4Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel2Spell5Checked !== undefined){setCharacterSpellLevel2Spell5Checked(pcs[0]?.pc_data.characterSpellLevel2Spell5Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel2Spell6Checked !== undefined){setCharacterSpellLevel2Spell6Checked(pcs[0]?.pc_data.characterSpellLevel2Spell6Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel2Spell7Checked !== undefined){setCharacterSpellLevel2Spell7Checked(pcs[0]?.pc_data.characterSpellLevel2Spell7Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel2Spell8Checked !== undefined){setCharacterSpellLevel2Spell8Checked(pcs[0]?.pc_data.characterSpellLevel2Spell8Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel2Spell9Checked !== undefined){setCharacterSpellLevel2Spell9Checked(pcs[0]?.pc_data.characterSpellLevel2Spell9Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel2Spell10Checked !== undefined){setCharacterSpellLevel2Spell10Checked(pcs[0]?.pc_data.characterSpellLevel2Spell10Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel2Spell11Checked !== undefined){setCharacterSpellLevel2Spell11Checked(pcs[0]?.pc_data.characterSpellLevel2Spell11Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel2Spell12Checked !== undefined){setCharacterSpellLevel2Spell12Checked(pcs[0]?.pc_data.characterSpellLevel2Spell13Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel2Spell13Checked !== undefined){setCharacterSpellLevel2Spell13Checked(pcs[0]?.pc_data.characterSpellLevel2Spell13Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel3Spell1Checked !== undefined){setCharacterSpellLevel3Spell1Checked(pcs[0]?.pc_data.characterSpellLevel3Spell1Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel3Spell2Checked !== undefined){setCharacterSpellLevel3Spell2Checked(pcs[0]?.pc_data.characterSpellLevel3Spell2Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel3Spell3Checked !== undefined){setCharacterSpellLevel3Spell3Checked(pcs[0]?.pc_data.characterSpellLevel3Spell3Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel3Spell4Checked !== undefined){setCharacterSpellLevel3Spell4Checked(pcs[0]?.pc_data.characterSpellLevel3Spell4Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel3Spell5Checked !== undefined){setCharacterSpellLevel3Spell5Checked(pcs[0]?.pc_data.characterSpellLevel3Spell5Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel3Spell6Checked !== undefined){setCharacterSpellLevel3Spell6Checked(pcs[0]?.pc_data.characterSpellLevel3Spell6Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel3Spell7Checked !== undefined){setCharacterSpellLevel3Spell7Checked(pcs[0]?.pc_data.characterSpellLevel3Spell7Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel3Spell8Checked !== undefined){setCharacterSpellLevel3Spell8Checked(pcs[0]?.pc_data.characterSpellLevel3Spell8Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel3Spell9Checked !== undefined){setCharacterSpellLevel3Spell9Checked(pcs[0]?.pc_data.characterSpellLevel3Spell9Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel3Spell10Checked !== undefined){setCharacterSpellLevel3Spell10Checked(pcs[0]?.pc_data.characterSpellLevel3Spell10Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel3Spell11Checked !== undefined){setCharacterSpellLevel3Spell11Checked(pcs[0]?.pc_data.characterSpellLevel3Spell11Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel3Spell12Checked !== undefined){setCharacterSpellLevel3Spell12Checked(pcs[0]?.pc_data.characterSpellLevel3Spell12Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel3Spell13Checked !== undefined){setCharacterSpellLevel3Spell13Checked(pcs[0]?.pc_data.characterSpellLevel3Spell13Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel4Spell1Checked !== undefined){setCharacterSpellLevel4Spell1Checked(pcs[0]?.pc_data.characterSpellLevel4Spell1Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel4Spell2Checked !== undefined){setCharacterSpellLevel4Spell2Checked(pcs[0]?.pc_data.characterSpellLevel4Spell2Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel4Spell3Checked !== undefined){setCharacterSpellLevel4Spell3Checked(pcs[0]?.pc_data.characterSpellLevel4Spell3Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel4Spell4Checked !== undefined){setCharacterSpellLevel4Spell4Checked(pcs[0]?.pc_data.characterSpellLevel4Spell4Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel4Spell5Checked !== undefined){setCharacterSpellLevel4Spell5Checked(pcs[0]?.pc_data.characterSpellLevel4Spell5Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel4Spell6Checked !== undefined){setCharacterSpellLevel4Spell6Checked(pcs[0]?.pc_data.characterSpellLevel4Spell6Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel4Spell7Checked !== undefined){setCharacterSpellLevel4Spell7Checked(pcs[0]?.pc_data.characterSpellLevel4Spell7Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel4Spell8Checked !== undefined){setCharacterSpellLevel4Spell8Checked(pcs[0]?.pc_data.characterSpellLevel4Spell8Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel4Spell9Checked !== undefined){setCharacterSpellLevel4Spell9Checked(pcs[0]?.pc_data.characterSpellLevel4Spell9Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel4Spell10Checked !== undefined){setCharacterSpellLevel4Spell10Checked(pcs[0]?.pc_data.characterSpellLevel4Spell10Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel4Spell11Checked !== undefined){setCharacterSpellLevel4Spell11Checked(pcs[0]?.pc_data.characterSpellLevel4Spell11Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel4Spell12Checked !== undefined){setCharacterSpellLevel4Spell12Checked(pcs[0]?.pc_data.characterSpellLevel4Spell12Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel4Spell13Checked !== undefined){setCharacterSpellLevel4Spell13Checked(pcs[0]?.pc_data.characterSpellLevel4Spell13Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel5Spell1Checked !== undefined){setCharacterSpellLevel5Spell1Checked(pcs[0]?.pc_data.characterSpellLevel5Spell1Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel5Spell2Checked !== undefined){setCharacterSpellLevel5Spell2Checked(pcs[0]?.pc_data.characterSpellLevel5Spell2Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel5Spell3Checked !== undefined){setCharacterSpellLevel5Spell3Checked(pcs[0]?.pc_data.characterSpellLevel5Spell3Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel5Spell4Checked !== undefined){setCharacterSpellLevel5Spell4Checked(pcs[0]?.pc_data.characterSpellLevel5Spell4Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel5Spell5Checked !== undefined){setCharacterSpellLevel5Spell5Checked(pcs[0]?.pc_data.characterSpellLevel5Spell5Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel5Spell6Checked !== undefined){setCharacterSpellLevel5Spell6Checked(pcs[0]?.pc_data.characterSpellLevel5Spell6Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel5Spell7Checked !== undefined){setCharacterSpellLevel5Spell7Checked(pcs[0]?.pc_data.characterSpellLevel5Spell7Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel5Spell8Checked !== undefined){setCharacterSpellLevel5Spell8Checked(pcs[0]?.pc_data.characterSpellLevel5Spell8Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel6Spell1Checked !== undefined){setCharacterSpellLevel6Spell1Checked(pcs[0]?.pc_data.characterSpellLevel6Spell1Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel6Spell2Checked !== undefined){setCharacterSpellLevel6Spell2Checked(pcs[0]?.pc_data.characterSpellLevel6Spell2Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel6Spell3Checked !== undefined){setCharacterSpellLevel6Spell3Checked(pcs[0]?.pc_data.characterSpellLevel6Spell3Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel6Spell4Checked !== undefined){setCharacterSpellLevel6Spell4Checked(pcs[0]?.pc_data.characterSpellLevel6Spell4Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel6Spell5Checked !== undefined){setCharacterSpellLevel6Spell5Checked(pcs[0]?.pc_data.characterSpellLevel6Spell5Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel6Spell6Checked !== undefined){setCharacterSpellLevel6Spell6Checked(pcs[0]?.pc_data.characterSpellLevel6Spell6Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel6Spell7Checked !== undefined){setCharacterSpellLevel6Spell7Checked(pcs[0]?.pc_data.characterSpellLevel6Spell7Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel6Spell8Checked !== undefined){setCharacterSpellLevel6Spell8Checked(pcs[0]?.pc_data.characterSpellLevel6Spell8Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel7Spell1Checked !== undefined){setCharacterSpellLevel7Spell1Checked(pcs[0]?.pc_data.characterSpellLevel7Spell1Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel7Spell2Checked !== undefined){setCharacterSpellLevel7Spell2Checked(pcs[0]?.pc_data.characterSpellLevel7Spell2Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel7Spell3Checked !== undefined){setCharacterSpellLevel7Spell3Checked(pcs[0]?.pc_data.characterSpellLevel7Spell3Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel7Spell4Checked !== undefined){setCharacterSpellLevel7Spell4Checked(pcs[0]?.pc_data.characterSpellLevel7Spell4Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel7Spell5Checked !== undefined){setCharacterSpellLevel7Spell5Checked(pcs[0]?.pc_data.characterSpellLevel7Spell5Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel7Spell6Checked !== undefined){setCharacterSpellLevel7Spell6Checked(pcs[0]?.pc_data.characterSpellLevel7Spell6Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel7Spell7Checked !== undefined){setCharacterSpellLevel7Spell7Checked(pcs[0]?.pc_data.characterSpellLevel7Spell7Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel7Spell8Checked !== undefined){setCharacterSpellLevel7Spell8Checked(pcs[0]?.pc_data.characterSpellLevel7Spell8Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel8Spell1Checked !== undefined){setCharacterSpellLevel8Spell1Checked(pcs[0]?.pc_data.characterSpellLevel8Spell1Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel8Spell2Checked !== undefined){setCharacterSpellLevel8Spell2Checked(pcs[0]?.pc_data.characterSpellLevel8Spell2Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel8Spell3Checked !== undefined){setCharacterSpellLevel8Spell3Checked(pcs[0]?.pc_data.characterSpellLevel8Spell3Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel8Spell4Checked !== undefined){setCharacterSpellLevel8Spell4Checked(pcs[0]?.pc_data.characterSpellLevel8Spell4Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel8Spell5Checked !== undefined){setCharacterSpellLevel8Spell5Checked(pcs[0]?.pc_data.characterSpellLevel8Spell5Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel8Spell6Checked !== undefined){setCharacterSpellLevel8Spell6Checked(pcs[0]?.pc_data.characterSpellLevel8Spell6Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel8Spell7Checked !== undefined){setCharacterSpellLevel8Spell7Checked(pcs[0]?.pc_data.characterSpellLevel8Spell7Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel8Spell8Checked !== undefined){setCharacterSpellLevel8Spell8Checked(pcs[0]?.pc_data.characterSpellLevel8Spell8Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel9Spell1Checked !== undefined){setCharacterSpellLevel9Spell1Checked(pcs[0]?.pc_data.characterSpellLevel9Spell1Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel9Spell2Checked !== undefined){setCharacterSpellLevel9Spell2Checked(pcs[0]?.pc_data.characterSpellLevel9Spell2Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel9Spell3Checked !== undefined){setCharacterSpellLevel9Spell3Checked(pcs[0]?.pc_data.characterSpellLevel9Spell3Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel9Spell4Checked !== undefined){setCharacterSpellLevel9Spell4Checked(pcs[0]?.pc_data.characterSpellLevel9Spell4Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel9Spell5Checked !== undefined){setCharacterSpellLevel9Spell5Checked(pcs[0]?.pc_data.characterSpellLevel9Spell5Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel9Spell6Checked !== undefined){setCharacterSpellLevel9Spell6Checked(pcs[0]?.pc_data.characterSpellLevel9Spell6Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel9Spell7Checked !== undefined){setCharacterSpellLevel9Spell7Checked(pcs[0]?.pc_data.characterSpellLevel9Spell7Checked)}
    if(pcs[0]?.pc_data.characterSpellLevel9Spell8Checked !== undefined){setCharacterSpellLevel9Spell8Checked(pcs[0]?.pc_data.characterSpellLevel9Spell8Checked)}
    if(pcs[0]?.pc_data.characterStealthChecked !== undefined){setCharacterStealthChecked(pcs[0]?.pc_data.characterStealthChecked)}
    if(pcs[0]?.pc_data.characterStrengthSaveChecked !== undefined){setCharacterStrengthSaveChecked(pcs[0]?.pc_data.characterStrengthSaveChecked)}
    if(pcs[0]?.pc_data.characterSurvivalChecked !== undefined){setCharacterSurvivalChecked(pcs[0]?.pc_data.characterSurvivalChecked)}
    if(pcs[0]?.pc_data.characterWisdomSaveChecked !== undefined){setCharacterWisdomSaveChecked(pcs[0]?.pc_data.characterWisdomSaveChecked)}
    if(pcs[0]?.pc_data.charisma !== undefined){setCharacterCharisma(pcs[0]?.pc_data.charisma)}
    if(pcs[0]?.pc_data.charismaModifier !== undefined){setCharacterCharismaModifier(pcs[0]?.pc_data.charismaModifier)}
    if(pcs[0]?.pc_data.charismaSave !== undefined){setCharacterCharismaSave(pcs[0]?.pc_data.charismaSave)}
    if(pcs[0]?.pc_data.constitution !== undefined){setCharacterConstitution(pcs[0]?.pc_data.constitution)}
    if(pcs[0]?.pc_data.constitutionModifier !== undefined){setCharacterConstitutionModifier(pcs[0]?.pc_data.constitutionModifier)}
    if(pcs[0]?.pc_data.constitutionSave !== undefined){setCharacterConstitutionSave(pcs[0]?.pc_data.constitutionSave)}
    if(pcs[0]?.pc_data.currentHP !== undefined){setCharacterCurrentHP(pcs[0]?.pc_data.currentHP)}
    if(pcs[0]?.pc_data.deception !== undefined){setCharacterDeception(pcs[0]?.pc_data.deception)}
    if(pcs[0]?.pc_data.dexterity !== undefined){setCharacterDexterity(pcs[0]?.pc_data.dexterity)}
    if(pcs[0]?.pc_data.dexterityModifier !== undefined){setCharacterDexterityModifier(pcs[0]?.pc_data.dexterityModifier)}
    if(pcs[0]?.pc_data.dexteritySave !== undefined){setCharacterDexteritySave(pcs[0]?.pc_data.dexteritySave)}
    if(pcs[0]?.pc_data.equipment !== undefined){setCharacterEquipment(pcs[0]?.pc_data.equipment)}
    if(pcs[0]?.pc_data.experience !== undefined){setCharacterExperience(pcs[0]?.pc_data.experience)}
    if(pcs[0]?.pc_data.eyes !== undefined){setCharacterEyes(pcs[0]?.pc_data.eyes)}
    // if(pcs[0]?.pc_data.featuresAndTraits !== undefined){setFeaturesAndTraits(pcs[0]?.pc_data.featuresAndTraits)}
    if(pcs[0]?.pc_data.flaws !== undefined){setCharacterFlaws(pcs[0]?.pc_data.flaws)}
    if(pcs[0]?.pc_data.hair !== undefined){setCharacterHair(pcs[0]?.pc_data.hair)}
    if(pcs[0]?.pc_data.height !== undefined){setCharacterHeight(pcs[0]?.pc_data.height)}
    if(pcs[0]?.pc_data.history !== undefined){setCharacterHistory(pcs[0]?.pc_data.history)}
    if(pcs[0]?.pc_data.hitDice1 !== undefined){setCharacterHitDice1(pcs[0]?.pc_data.hitDice1)}
    if(pcs[0]?.pc_data.hitDice2 !== undefined){setCharacterHitDice2(pcs[0]?.pc_data.hitDice2)}
    if(pcs[0]?.pc_data.ideals !== undefined){setCharacterIdeals(pcs[0]?.pc_data.ideals)}
    if(pcs[0]?.pc_data.initiative !== undefined){setCharacterInitiative(pcs[0]?.pc_data.initiative)}
    if(pcs[0]?.pc_data.insight !== undefined){setCharacterInsight(pcs[0]?.pc_data.insight)}
    if(pcs[0]?.pc_data.inspiration !== undefined){setCharacterInspiration(pcs[0]?.pc_data.inspiration)}
    if(pcs[0]?.pc_data.intelligence !== undefined){setCharacterIntelligence(pcs[0]?.pc_data.intelligence)}
    if(pcs[0]?.pc_data.intelligenceModifier !== undefined){setCharacterIntelligenceModifier(pcs[0]?.pc_data.intelligenceModifier)}
    if(pcs[0]?.pc_data.intelligenceSave !== undefined){setCharacterIntelligenceSave(pcs[0]?.pc_data.intelligenceSave)}
    if(pcs[0]?.pc_data.intimidation !== undefined){setCharacterIntimidation(pcs[0]?.pc_data.intimidation)}
    if(pcs[0]?.pc_data.investigation !== undefined){setCharacterInvestigation(pcs[0]?.pc_data.investigation)}
    if(pcs[0]?.pc_data.level !== undefined){setCharacterLevel(pcs[0]?.pc_data.level)}
    if(pcs[0]?.pc_data.maxHP !== undefined){setCharacterMaxHP(pcs[0]?.pc_data.maxHP)}
    if(pcs[0]?.pc_data.medicine !== undefined){setCharacterMedicine(pcs[0]?.pc_data.medicine)}
    if(pcs[0]?.pc_data.nature !== undefined){setCharacterNature(pcs[0]?.pc_data.nature)}
    if(pcs[0]?.pc_data.passiveWisdom !== undefined){setCharacterPassiveWisdom(pcs[0]?.pc_data.passiveWisdom)}
    if(pcs[0]?.pc_data.perception !== undefined){setCharacterPerception(pcs[0]?.pc_data.perception)}
    if(pcs[0]?.pc_data.performance !== undefined){setCharacterPerformance(pcs[0]?.pc_data.performance)}
    if(pcs[0]?.pc_data.personalityTraits !== undefined){setCharacterPersonalityTraits(pcs[0]?.pc_data.personalityTraits)}
    if(pcs[0]?.pc_data.persuasion !== undefined){setCharacterPersuasion(pcs[0]?.pc_data.persuasion)}
    if(pcs[0]?.pc_data.proficienciesAndLanguages !== undefined){setCharacterProficienciesAndLanguages(pcs[0]?.pc_data.proficienciesAndLanguages)}
    if(pcs[0]?.pc_data.proficiencyBonus !== undefined){setCharacterProficiencyBonus(pcs[0]?.pc_data.proficiencyBonus)}
    if(pcs[0]?.pc_data.race !== undefined){setCharacterRace(pcs[0]?.pc_data.race)}
    if(pcs[0]?.pc_data.religion !== undefined){setCharacterReligion(pcs[0]?.pc_data.religion)}
    if(pcs[0]?.pc_data.skin !== undefined){setCharacterSkin(pcs[0]?.pc_data.skin)}
    if(pcs[0]?.pc_data.slightOfHand !== undefined){setCharacterSleightOfHand(pcs[0]?.pc_data.slightOfHand)}
    if(pcs[0]?.pc_data.speed !== undefined){setCharacterSpeed(pcs[0]?.pc_data.speed)}
    if(pcs[0]?.pc_data.spellAbility !== undefined){setCharacterSpellAbility(pcs[0]?.pc_data.spellAbility)}
    if(pcs[0]?.pc_data.spellAttBonus !== undefined){setCharacterSpellAttackBonus(pcs[0]?.pc_data.spellAttBonus)}
    if(pcs[0]?.pc_data.spellLevel1Spell1 !== undefined){setCharacterSpellLevel1Spell1(pcs[0]?.pc_data.spellLevel1Spell1)}
    if(pcs[0]?.pc_data.spellLevel1Spell2 !== undefined){setCharacterSpellLevel1Spell2(pcs[0]?.pc_data.spellLevel1Spell2)}
    if(pcs[0]?.pc_data.spellLevel1Spell3 !== undefined){setCharacterSpellLevel1Spell3(pcs[0]?.pc_data.spellLevel1Spell3)}
    if(pcs[0]?.pc_data.spellLevel1Spell4 !== undefined){setCharacterSpellLevel1Spell4(pcs[0]?.pc_data.spellLevel1Spell4)}
    if(pcs[0]?.pc_data.spellLevel1Spell5 !== undefined){setCharacterSpellLevel1Spell5(pcs[0]?.pc_data.spellLevel1Spell5)}
    if(pcs[0]?.pc_data.spellLevel1Spell6 !== undefined){setCharacterSpellLevel1Spell6(pcs[0]?.pc_data.spellLevel1Spell6)}
    if(pcs[0]?.pc_data.spellLevel1Spell7 !== undefined){setCharacterSpellLevel1Spell7(pcs[0]?.pc_data.spellLevel1Spell7)}
    if(pcs[0]?.pc_data.spellLevel1Spell8 !== undefined){setCharacterSpellLevel1Spell8(pcs[0]?.pc_data.spellLevel1Spell8)}
    if(pcs[0]?.pc_data.spellLevel1Spell9 !== undefined){setCharacterSpellLevel1Spell9(pcs[0]?.pc_data.spellLevel1Spell9)}
    if(pcs[0]?.pc_data.spellLevel1Spell10 !== undefined){setCharacterSpellLevel1Spell10(pcs[0]?.pc_data.spellLevel1Spell10)}
    if(pcs[0]?.pc_data.spellLevel1Spell11 !== undefined){setCharacterSpellLevel1Spell11(pcs[0]?.pc_data.spellLevel1Spell11)}
    if(pcs[0]?.pc_data.spellLevel1Spell12 !== undefined){setCharacterSpellLevel1Spell12(pcs[0]?.pc_data.spellLevel1Spell12)}
    if(pcs[0]?.pc_data.spellLevel1Spell13 !== undefined){setCharacterSpellLevel1Spell13(pcs[0]?.pc_data.spellLevel1Spell13)}
    if(pcs[0]?.pc_data.spellLevel1Total !== undefined){setSpellLevel1Total(pcs[0]?.pc_data.spellLevel1Total)}
    if(pcs[0]?.pc_data.spellLevel1Used !== undefined){setSpellLevel1Used(pcs[0]?.pc_data.spellLevel1Used)}
    if(pcs[0]?.pc_data.spellLevel2Spell1 !== undefined){setCharacterSpellLevel2Spell1(pcs[0]?.pc_data.spellLevel2Spell1)}
    if(pcs[0]?.pc_data.spellLevel2Spell2 !== undefined){setCharacterSpellLevel2Spell2(pcs[0]?.pc_data.spellLevel2Spell2)}
    if(pcs[0]?.pc_data.spellLevel2Spell3 !== undefined){setCharacterSpellLevel2Spell3(pcs[0]?.pc_data.spellLevel2Spell3)}
    if(pcs[0]?.pc_data.spellLevel2Spell4 !== undefined){setCharacterSpellLevel2Spell4(pcs[0]?.pc_data.spellLevel2Spell4)}
    if(pcs[0]?.pc_data.spellLevel2Spell5 !== undefined){setCharacterSpellLevel2Spell5(pcs[0]?.pc_data.spellLevel2Spell5)}
    if(pcs[0]?.pc_data.spellLevel2Spell6 !== undefined){setCharacterSpellLevel2Spell6(pcs[0]?.pc_data.spellLevel2Spell6)}
    if(pcs[0]?.pc_data.spellLevel2Spell7 !== undefined){setCharacterSpellLevel2Spell7(pcs[0]?.pc_data.spellLevel2Spell7)}
    if(pcs[0]?.pc_data.spellLevel2Spell8 !== undefined){setCharacterSpellLevel2Spell8(pcs[0]?.pc_data.spellLevel2Spell8)}
    if(pcs[0]?.pc_data.spellLevel2Spell9 !== undefined){setCharacterSpellLevel2Spell9(pcs[0]?.pc_data.spellLevel2Spell9)}
    if(pcs[0]?.pc_data.spellLevel2Spell10 !== undefined){setCharacterSpellLevel2Spell10(pcs[0]?.pc_data.spellLevel2Spell10)}
    if(pcs[0]?.pc_data.spellLevel2Spell11 !== undefined){setCharacterSpellLevel2Spell11(pcs[0]?.pc_data.spellLevel2Spell11)}
    if(pcs[0]?.pc_data.spellLevel2Spell12 !== undefined){setCharacterSpellLevel2Spell12(pcs[0]?.pc_data.spellLevel2Spell12)}
    if(pcs[0]?.pc_data.spellLevel2Spell13 !== undefined){setCharacterSpellLevel2Spell13(pcs[0]?.pc_data.spellLevel2Spell13)}
    if(pcs[0]?.pc_data.spellLevel2Total !== undefined){setSpellLevel2Total(pcs[0]?.pc_data.spellLevel2Total)}
    if(pcs[0]?.pc_data.spellLevel2Used !== undefined){setSpellLevel2Used(pcs[0]?.pc_data.spellLevel2Used)}
    if(pcs[0]?.pc_data.spellLevel3Spell1 !== undefined){setCharacterSpellLevel3Spell1(pcs[0]?.pc_data.spellLevel3Spell1)}
    if(pcs[0]?.pc_data.spellLevel3Spell2 !== undefined){setCharacterSpellLevel3Spell2(pcs[0]?.pc_data.spellLevel3Spell2)}
    if(pcs[0]?.pc_data.spellLevel3Spell3 !== undefined){setCharacterSpellLevel3Spell3(pcs[0]?.pc_data.spellLevel3Spell3)}
    if(pcs[0]?.pc_data.spellLevel3Spell4 !== undefined){setCharacterSpellLevel3Spell4(pcs[0]?.pc_data.spellLevel3Spell4)}
    if(pcs[0]?.pc_data.spellLevel3Spell5 !== undefined){setCharacterSpellLevel3Spell5(pcs[0]?.pc_data.spellLevel3Spell5)}
    if(pcs[0]?.pc_data.spellLevel3Spell6 !== undefined){setCharacterSpellLevel3Spell6(pcs[0]?.pc_data.spellLevel3Spell6)}
    if(pcs[0]?.pc_data.spellLevel3Spell7 !== undefined){setCharacterSpellLevel3Spell7(pcs[0]?.pc_data.spellLevel3Spell7)}
    if(pcs[0]?.pc_data.spellLevel3Spell8 !== undefined){setCharacterSpellLevel3Spell8(pcs[0]?.pc_data.spellLevel3Spell8)}
    if(pcs[0]?.pc_data.spellLevel3Spell9 !== undefined){setCharacterSpellLevel3Spell9(pcs[0]?.pc_data.spellLevel3Spell9)}
    if(pcs[0]?.pc_data.spellLevel3Spell10 !== undefined){setCharacterSpellLevel3Spell10(pcs[0]?.pc_data.spellLevel3Spell10)}
    if(pcs[0]?.pc_data.spellLevel3Spell11 !== undefined){setCharacterSpellLevel3Spell11(pcs[0]?.pc_data.spellLevel3Spell11)}
    if(pcs[0]?.pc_data.spellLevel3Spell12 !== undefined){setCharacterSpellLevel3Spell12(pcs[0]?.pc_data.spellLevel3Spell12)}
    if(pcs[0]?.pc_data.spellLevel3Spell13 !== undefined){setCharacterSpellLevel3Spell13(pcs[0]?.pc_data.spellLevel3Spell13)}
    if(pcs[0]?.pc_data.spellLevel3Total !== undefined){setSpellLevel3Total(pcs[0]?.pc_data.spellLevel3Total)}
    if(pcs[0]?.pc_data.spellLevel3Used !== undefined){setSpellLevel3Used(pcs[0]?.pc_data.spellLevel3Used)}
    if(pcs[0]?.pc_data.spellLevel4Spell1 !== undefined){setCharacterSpellLevel4Spell1(pcs[0]?.pc_data.spellLevel4Spell1)}
    if(pcs[0]?.pc_data.spellLevel4Spell2 !== undefined){setCharacterSpellLevel4Spell2(pcs[0]?.pc_data.spellLevel4Spell2)}
    if(pcs[0]?.pc_data.spellLevel4Spell3 !== undefined){setCharacterSpellLevel4Spell3(pcs[0]?.pc_data.spellLevel4Spell3)}
    if(pcs[0]?.pc_data.spellLevel4Spell4 !== undefined){setCharacterSpellLevel4Spell4(pcs[0]?.pc_data.spellLevel4Spell4)}
    if(pcs[0]?.pc_data.spellLevel4Spell5 !== undefined){setCharacterSpellLevel4Spell5(pcs[0]?.pc_data.spellLevel4Spell5)}
    if(pcs[0]?.pc_data.spellLevel4Spell6 !== undefined){setCharacterSpellLevel4Spell6(pcs[0]?.pc_data.spellLevel4Spell6)}
    if(pcs[0]?.pc_data.spellLevel4Spell7 !== undefined){setCharacterSpellLevel4Spell7(pcs[0]?.pc_data.spellLevel4Spell7)}
    if(pcs[0]?.pc_data.spellLevel4Spell8 !== undefined){setCharacterSpellLevel4Spell8(pcs[0]?.pc_data.spellLevel4Spell8)}
    if(pcs[0]?.pc_data.spellLevel4Spell9 !== undefined){setCharacterSpellLevel4Spell9(pcs[0]?.pc_data.spellLevel4Spell9)}
    if(pcs[0]?.pc_data.spellLevel4Spell10 !== undefined){setCharacterSpellLevel4Spell10(pcs[0]?.pc_data.spellLevel4Spell10)}
    if(pcs[0]?.pc_data.spellLevel4Spell11 !== undefined){setCharacterSpellLevel4Spell11(pcs[0]?.pc_data.spellLevel4Spell11)}
    if(pcs[0]?.pc_data.spellLevel4Spell12 !== undefined){setCharacterSpellLevel4Spell12(pcs[0]?.pc_data.spellLevel4Spell12)}
    if(pcs[0]?.pc_data.spellLevel4Spell13 !== undefined){setCharacterSpellLevel4Spell13(pcs[0]?.pc_data.spellLevel4Spell13)}
    if(pcs[0]?.pc_data.spellLevel4Total !== undefined){setSpellLevel4Total(pcs[0]?.pc_data.spellLevel4Total)}
    if(pcs[0]?.pc_data.spellLevel4Used !== undefined){setSpellLevel4Used(pcs[0]?.pc_data.spellLevel4Used)}
    if(pcs[0]?.pc_data.spellLevel5Spell1 !== undefined){setCharacterSpellLevel5Spell1(pcs[0]?.pc_data.spellLevel5Spell1)}
    if(pcs[0]?.pc_data.spellLevel5Spell2 !== undefined){setCharacterSpellLevel5Spell2(pcs[0]?.pc_data.spellLevel5Spell2)}
    if(pcs[0]?.pc_data.spellLevel5Spell3 !== undefined){setCharacterSpellLevel5Spell3(pcs[0]?.pc_data.spellLevel5Spell3)}
    if(pcs[0]?.pc_data.spellLevel5Spell4 !== undefined){setCharacterSpellLevel5Spell4(pcs[0]?.pc_data.spellLevel5Spell4)}
    if(pcs[0]?.pc_data.spellLevel5Spell5 !== undefined){setCharacterSpellLevel5Spell5(pcs[0]?.pc_data.spellLevel5Spell5)}
    if(pcs[0]?.pc_data.spellLevel5Spell6 !== undefined){setCharacterSpellLevel5Spell6(pcs[0]?.pc_data.spellLevel5Spell6)}
    if(pcs[0]?.pc_data.spellLevel5Spell7 !== undefined){setCharacterSpellLevel5Spell7(pcs[0]?.pc_data.spellLevel5Spell7)}
    if(pcs[0]?.pc_data.spellLevel5Spell8 !== undefined){setCharacterSpellLevel5Spell8(pcs[0]?.pc_data.spellLevel5Spell8)}
    if(pcs[0]?.pc_data.spellLevel5Used !== undefined){setSpellLevel5Used(pcs[0]?.pc_data.spellLevel5Used)}
    if(pcs[0]?.pc_data.spellLevel5Used !== undefined){setSpellLevel5Used(pcs[0]?.pc_data.spellLevel5Used)}
    if(pcs[0]?.pc_data.spellLevel6Spell1 !== undefined){setCharacterSpellLevel6Spell1(pcs[0]?.pc_data.spellLevel6Spell1)}
    if(pcs[0]?.pc_data.spellLevel6Spell2 !== undefined){setCharacterSpellLevel6Spell2(pcs[0]?.pc_data.spellLevel6Spell2)}
    if(pcs[0]?.pc_data.spellLevel6Spell3 !== undefined){setCharacterSpellLevel6Spell3(pcs[0]?.pc_data.spellLevel6Spell3)}
    if(pcs[0]?.pc_data.spellLevel6Spell4 !== undefined){setCharacterSpellLevel6Spell4(pcs[0]?.pc_data.spellLevel6Spell4)}
    if(pcs[0]?.pc_data.spellLevel6Spell5 !== undefined){setCharacterSpellLevel6Spell5(pcs[0]?.pc_data.spellLevel6Spell5)}
    if(pcs[0]?.pc_data.spellLevel6Spell6 !== undefined){setCharacterSpellLevel6Spell6(pcs[0]?.pc_data.spellLevel6Spell6)}
    if(pcs[0]?.pc_data.spellLevel6Spell7 !== undefined){setCharacterSpellLevel6Spell7(pcs[0]?.pc_data.spellLevel6Spell7)}
    if(pcs[0]?.pc_data.spellLevel6Spell8 !== undefined){setCharacterSpellLevel6Spell8(pcs[0]?.pc_data.spellLevel6Spell8)}
    if(pcs[0]?.pc_data.spellLevel6Used !== undefined){setSpellLevel6Used(pcs[0]?.pc_data.spellLevel6Used)}
    if(pcs[0]?.pc_data.spellLevel6Used !== undefined){setSpellLevel6Used(pcs[0]?.pc_data.spellLevel6Used)}
    if(pcs[0]?.pc_data.spellLevel7Spell1 !== undefined){setCharacterSpellLevel7Spell1(pcs[0]?.pc_data.spellLevel7Spell1)}
    if(pcs[0]?.pc_data.spellLevel7Spell2 !== undefined){setCharacterSpellLevel7Spell2(pcs[0]?.pc_data.spellLevel7Spell2)}
    if(pcs[0]?.pc_data.spellLevel7Spell3 !== undefined){setCharacterSpellLevel7Spell3(pcs[0]?.pc_data.spellLevel7Spell3)}
    if(pcs[0]?.pc_data.spellLevel7Spell4 !== undefined){setCharacterSpellLevel7Spell4(pcs[0]?.pc_data.spellLevel7Spell4)}
    if(pcs[0]?.pc_data.spellLevel7Spell5 !== undefined){setCharacterSpellLevel7Spell5(pcs[0]?.pc_data.spellLevel7Spell5)}
    if(pcs[0]?.pc_data.spellLevel7Spell6 !== undefined){setCharacterSpellLevel7Spell6(pcs[0]?.pc_data.spellLevel7Spell6)}
    if(pcs[0]?.pc_data.spellLevel7Spell7 !== undefined){setCharacterSpellLevel7Spell7(pcs[0]?.pc_data.spellLevel7Spell7)}
    if(pcs[0]?.pc_data.spellLevel7Spell8 !== undefined){setCharacterSpellLevel7Spell8(pcs[0]?.pc_data.spellLevel7Spell8)}
    if(pcs[0]?.pc_data.spellLevel7Used !== undefined){setSpellLevel7Used(pcs[0]?.pc_data.spellLevel7Used)}
    if(pcs[0]?.pc_data.spellLevel7Used !== undefined){setSpellLevel7Used(pcs[0]?.pc_data.spellLevel7Used)}
    if(pcs[0]?.pc_data.spellLevel8Spell1 !== undefined){setCharacterSpellLevel8Spell1(pcs[0]?.pc_data.spellLevel8Spell1)}
    if(pcs[0]?.pc_data.spellLevel8Spell2 !== undefined){setCharacterSpellLevel8Spell2(pcs[0]?.pc_data.spellLevel8Spell2)}
    if(pcs[0]?.pc_data.spellLevel8Spell3 !== undefined){setCharacterSpellLevel8Spell3(pcs[0]?.pc_data.spellLevel8Spell3)}
    if(pcs[0]?.pc_data.spellLevel8Spell4 !== undefined){setCharacterSpellLevel8Spell4(pcs[0]?.pc_data.spellLevel8Spell4)}
    if(pcs[0]?.pc_data.spellLevel8Spell5 !== undefined){setCharacterSpellLevel8Spell5(pcs[0]?.pc_data.spellLevel8Spell5)}
    if(pcs[0]?.pc_data.spellLevel8Spell6 !== undefined){setCharacterSpellLevel8Spell6(pcs[0]?.pc_data.spellLevel8Spell6)}
    if(pcs[0]?.pc_data.spellLevel8Spell7 !== undefined){setCharacterSpellLevel8Spell7(pcs[0]?.pc_data.spellLevel8Spell7)}
    if(pcs[0]?.pc_data.spellLevel8Spell8 !== undefined){setCharacterSpellLevel8Spell8(pcs[0]?.pc_data.spellLevel8Spell8)}
    if(pcs[0]?.pc_data.spellLevel8Used !== undefined){setSpellLevel8Used(pcs[0]?.pc_data.spellLevel8Used)}
    if(pcs[0]?.pc_data.spellLevel8Used !== undefined){setSpellLevel8Used(pcs[0]?.pc_data.spellLevel8Used)}
    if(pcs[0]?.pc_data.spellLevel9Spell1 !== undefined){setCharacterSpellLevel9Spell1(pcs[0]?.pc_data.spellLevel9Spell1)}
    if(pcs[0]?.pc_data.spellLevel9Spell2 !== undefined){setCharacterSpellLevel9Spell2(pcs[0]?.pc_data.spellLevel9Spell2)}
    if(pcs[0]?.pc_data.spellLevel9Spell3 !== undefined){setCharacterSpellLevel9Spell3(pcs[0]?.pc_data.spellLevel9Spell3)}
    if(pcs[0]?.pc_data.spellLevel9Spell4 !== undefined){setCharacterSpellLevel9Spell4(pcs[0]?.pc_data.spellLevel9Spell4)}
    if(pcs[0]?.pc_data.spellLevel9Spell5 !== undefined){setCharacterSpellLevel9Spell5(pcs[0]?.pc_data.spellLevel9Spell5)}
    if(pcs[0]?.pc_data.spellLevel9Spell6 !== undefined){setCharacterSpellLevel9Spell6(pcs[0]?.pc_data.spellLevel9Spell6)}
    if(pcs[0]?.pc_data.spellLevel9Spell7 !== undefined){setCharacterSpellLevel9Spell7(pcs[0]?.pc_data.spellLevel9Spell7)}
    if(pcs[0]?.pc_data.spellLevel9Spell8 !== undefined){setCharacterSpellLevel9Spell8(pcs[0]?.pc_data.spellLevel9Spell8)}
    if(pcs[0]?.pc_data.spellLevel9Used !== undefined){setSpellLevel9Used(pcs[0]?.pc_data.spellLevel9Used)}
    if(pcs[0]?.pc_data.spellLevel9Used !== undefined){setSpellLevel9Used(pcs[0]?.pc_data.spellLevel9Used)}
    if(pcs[0]?.pc_data.spellSaveDC !== undefined){setCharacterSpellSaveDC(pcs[0]?.pc_data.spellSaveDC)}
    if(pcs[0]?.pc_data.stealth !== undefined){setCharacterStealth(pcs[0]?.pc_data.stealth)}
    if(pcs[0]?.pc_data.strength !== undefined){setCharacterStrength(pcs[0]?.pc_data.strength)}
    if(pcs[0]?.pc_data.strengthModifier !== undefined){setCharacterStrengthModifier(pcs[0]?.pc_data.strengthModifier)}
    if(pcs[0]?.pc_data.strengthSave !== undefined){setCharacterStrengthSave(pcs[0]?.pc_data.strengthSave)}
    if(pcs[0]?.pc_data.survival !== undefined){setCharacterSurvival(pcs[0]?.pc_data.survival)}
    if(pcs[0]?.pc_data.tempHP !== undefined){setCharacterTempHP(pcs[0]?.pc_data.tempHP)}
    if(pcs[0]?.pc_data.treasures !== undefined){setCharacterTreasures(pcs[0]?.pc_data.treasures)}
    if(pcs[0]?.pc_data.weight !== undefined){setCharacterWeight(pcs[0]?.pc_data.weight)}
    if(pcs[0]?.pc_data.wisdom !== undefined){setCharacterWisdom(pcs[0]?.pc_data.wisdom)}
    if(pcs[0]?.pc_data.wisdomModifier !== undefined){setCharacterWisdomModifier(pcs[0]?.pc_data.wisdomModifier)}
    if(pcs[0]?.pc_data.wisdomSave !== undefined){setCharacterWisdomSave(pcs[0]?.pc_data.wisdomSave)}
  }, [pcs])

  useEffect(() => {
    const setValues = async () => {
      setCharacterAlignment(alignment);
      setCharacterName(nameValue);
      setCharacterDescription(description);
      setCharacterBackground(background);
      setCharacterCharacterClass(characterClass);
      setCharacterRace(race);
    }
    setValues();

  }, [nameValue, description, background, characterClass, race, alignment])

  const formToJSON = (elements) =>
    [].reduce.call(
      elements,
      (data, element) => {
        data[element.name] = element.defaultValue;
        return data;
      },
      {}
    );

  useEffect(() => {
    const setImageValue = () => {
      const { data: bucketImage, error: bucketError } = supabase
        .storage
        .from('dnd_images')
        .getPublicUrl(`character_images/${user?.id}/${characterName}/character_image.png`)
        
      setBucketImage(bucketImage.publicUrl.toString());
    }
    setImageValue();
  }, [user, supabase, characterName])

  const handleSavePc = async (e) => {
    e.preventDefault();
    const data = formToJSON(ref.current);
    const { error } = await supabase
      .from('pc_characters')
      .insert({id: user.id, pc_name: nameValue, pc_data: data})

    // const { data: image, error: imgError } = await supabase.storage
    //   .from('dnd_images')
    //   .upload(`character_images/${user.id}/${nameValue}/character_image.png`, decode(b64), {
    //     cacheControl: '3600',
    //     upsert: false,
    //     contentType: 'image/png'
    //   })
  };

  const handleUpdatePc = async (e) => {
    e.preventDefault();
    const data = formToJSON(ref.current);
    const { error } = await supabase
      .from('pc_characters')
      .update({pc_data: data})
      .eq('pc_id', pc_id)
  };

  return (
    <form
      ref={ref}
      className="container p-4 space-y-6 w-full"
    >
      <div className="grid grid-cols-1">
      {!pc_id ? (
        <div />
      ) : (
        <h1 className="text-4xl text-center">{characterName}</h1>
      )}
        {!pc_id ? (
          <div className="hidden">            
          </div>
          ) : (
            <div className="flex place-self-center p-2">
              <Image
                src={bucketImage}
                alt="DALL-E image of dnd character"
                name="characterImage"
                width={400}
                height={400}
                className="border-2 border-black rounded-md w-full"
              />
              <div
                className="hidden" 
                name="characterImage"
                value={characterImage}
              />
            </div>
          )}
        </div>
      <div className="flex justify-center space-x-4">
        <h1 className="text-4xl font-bold">Character Sheet</h1>
        <button
          onClick={
            !pc_id ? handleSavePc : handleUpdatePc
          }
          type="submit"
          className="bg-defaultButton p-2 rounded-md"
        >
          {!pc_id ? <p>Save Character Sheet</p> : <p>Update Character Sheet</p>} 
        </button>
      </div>
      {/* Sheet One */}
      <main className="flex flex-col items-center">
        <div className="bg-white rounded-md shadow-md p-4 w-full">
          <div className="grid grid-cols-1 border-2">
            <div className="grid grid-cols-3">
              <div>
                <p className="text-center">Character Name</p>
                <input
                  type="text"
                  placeholder="Name"
                  value={characterName}
                  onChange={(e) => setCharacterName(e.target.value)}
                  name="name"
                  className="border rounded-md p-2 text-lg w-full"
                />
              </div>
              <div className="grid col-span-2 grid-cols-3">
                <div>
                  <p className="text-center">Class & Level</p>
                  <input
                    type="text"
                    placeholder="Class & Level"
                    value={characterCharacterClass}
                    onChange={(e) => setCharacterCharacterClass(e.target.value)}
                    name="classAndLevel"
                    className="border rounded-md p-2 text-lg w-full"
                  />
                </div>
                <div>
                  <p className="text-center">Background</p>
                  <input
                    type="text"
                    placeholder="Background"
                    name="background"
                    value={characterBackground}
                    onChange={(e) => setCharacterBackground(e.target.value)}
                    className="border rounded-md p-2 text-lg w-full"
                  />
                </div>
                <div>
                  <p className="text-center">Level</p>
                  <input
                    type="number"
                    placeholder="Level"
                    name="level"
                    value={characterSpellLevel}
                    onChange={(e) => setCharacterSpellLevel(e.target.value)}
                    className="border rounded-md p-2 text-lg w-full"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="grid col-start-2 col-span-2 grid-cols-3">
                <div>
                  Race
                  <input
                    type="text"
                    placeholder="Race"
                    name="race"
                    value={characterRace}
                    onChange={(e) => setCharacterRace(e.target.value)}
                    className="border rounded-md p-2 text-lg w-full"
                  />
                </div>
                <div>
                  Alignment
                  <input
                    type="text"
                    placeholder="Alignment"
                    name="alignment"
                    value={characterAlignment}
                    onChange={(e) => setCharacterAlignment(e.target.value)}
                    className="border rounded-md p-2 text-lg w-full"
                  />
                </div>
                <div>
                  Experience
                  <input
                    type="number"
                    placeholder="Experience"
                    name="experience"
                    value={characterExperience}
                    onChange={(e) => setCharacterExperience(e.target.value)}
                    className="border rounded-md p-2 text-lg w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between space-x-1 mt-4">
            <div className="grid grid-cols-1 space-y-1 w-1/4">
              <div className="text-center border-2">
                Inspiration
                <input
                  type="number"
                  placeholder="0"
                  name="inspiration"
                  value={characterInspiration}
                  onChange={(e) => setCharacterInspiration(e.target.value)}
                  className="border rounded-md p-2 text-sm text-white text-center w-16"
                />
              </div>
              <div className="text-center border-2">
                Proficiency Bonus
                <input
                  type="number"
                  placeholder="0"
                  name="proficiencyBonus"
                  value={characterProficiencyBonus}
                  onChange={(e) => setCharacterProficiencyBonus(e.target.value)}
                  className="border rounded-md p-2 text-sm text-white text-center w-16"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 border-2 py-3 space-y-2">
                <CharacterStats
                  name="strength"
                  nameModifier="strengthModifier"
                  label="Strength"
                  modifier="1"
                  setStatValue={(e) => setCharacterStrength(e.target.value)}
                  statValue={characterStrength}
                  setModifierValue={(e) =>
                    setCharacterStrengthModifier(e.target.value)
                  }
                  modifierValue={characterStrengthModifier}
                />
                <CharacterStats
                  name="dexterity"
                  nameModifier="dexterityModifier"
                  label="Dexterity"
                  setStatValue={(e) => setCharacterDexterity(e.target.value)}
                  statValue={characterDexterity}
                  setModifierValue={(e) =>
                    setCharacterDexterityModifier(e.target.value)
                  }
                  modifierValue={characterDexterityModifier}
                />
                <CharacterStats
                  name="constitution"
                  nameModifier="constitutionModifier"
                  label="Constitution"
                  setStatValue={(e) => setCharacterConstitution(e.target.value)}
                  statValue={characterConstitution}
                  setModifierValue={(e) =>
                    setCharacterConstitutionModifier(e.target.value)
                  }
                  modifierValue={characterConstitutionModifier}
                />
                <CharacterStats
                  name="intelligence"
                  nameModifier="intelligenceModifier"
                  label="Intelligence"
                  setStatValue={(e) => setCharacterIntelligence(e.target.value)}
                  statValue={characterIntelligence}
                  setModifierValue={(e) =>
                    setCharacterIntelligenceModifier(e.target.value)
                  }
                  modifierValue={characterIntelligenceModifier}
                />
                <CharacterStats
                  name="wisdom"
                  nameModifier="wisdomModifier"
                  label="Wisdom"
                  setStatValue={(e) => setCharacterWisdom(e.target.value)}
                  statValue={characterWisdom}
                  setModifierValue={(e) =>
                    setCharacterWisdomModifier(e.target.value)
                  }
                  modifierValue={characterWisdomModifier}
                />
                <CharacterStats
                  name="charisma"
                  nameModifier="charismaModifier"
                  label="Charisma"
                  setStatValue={(e) => setCharacterCharisma(e.target.value)}
                  statValue={characterCharisma}
                  setModifierValue={(e) =>
                    setCharacterCharismaModifier(e.target.value)
                  }
                  modifierValue={characterCharismaModifier}
                />
              </div>
            </div>
            <div className="space-y-1">
              <div className="grid grid-cols-1 border-2 p-1">
                <SavingThrows
                  savingName="strengthSave"
                  label="Strength"
                  setSavingValue={(e) =>
                    setCharacterStrengthSave(e.target.value)
                  }
                  statSavingValue={characterStrengthSave}
                  checkboxName="characterStrengthSaveChecked"
                  checked={characterStrengthSaveChecked}
                  setChecked={(e) =>
                    setCharacterStrengthSaveChecked(e.target.checked)
                  }
                />
                <SavingThrows
                  savingName="dexteritySave"
                  label="Dexterity"
                  setSavingValue={(e) =>
                    setCharacterDexteritySave(e.target.value)
                  }
                  statSavingValue={characterDexteritySave}
                  checkboxName="characterDexteritySaveChecked"
                  checked={characterDexteritySaveChecked}
                  setChecked={(e) =>
                    setCharacterDexteritySaveChecked(e.target.checked)
                  }
                />
                <SavingThrows
                  savingName="constitutionSave"
                  label="Constitution"
                  setSavingValue={(e) =>
                    setCharacterConstitutionSave(e.target.value)
                  }
                  statSavingValue={characterConstitutionSave}
                  checkboxName="characterConstitutionSaveChecked"
                  checked={characterConstitutionSaveChecked}
                  setChecked={(e) =>
                    setCharacterConstitutionSaveChecked(e.target.checked)
                  }
                />
                <SavingThrows
                  savingName="intelligenceSave"
                  label="Intelligence"
                  setSavingValue={(e) =>
                    setCharacterIntelligenceSave(e.target.value)
                  }
                  statSavingValue={characterIntelligenceSave}
                  checkboxName="characterIntelligenceSaveChecked"
                  checked={characterIntelligenceSaveChecked}
                  setChecked={(e) =>
                    setCharacterIntelligenceSaveChecked(e.target.checked)
                  }
                />
                <SavingThrows
                  savingName="wisdomSave"
                  label="Wisdom"
                  setSavingValue={(e) => setCharacterWisdomSave(e.target.value)}
                  statSavingValue={characterWisdomSave}
                  checkboxName="characterWisdomSaveChecked"
                  checked={characterWisdomSaveChecked}
                  setChecked={(e) =>
                    setCharacterWisdomSaveChecked(e.target.checked)
                  }
                />
                <SavingThrows
                  savingName="charismaSave"
                  label="Charisma"
                  setSavingValue={(e) =>
                    setCharacterCharismaSave(e.target.value)
                  }
                  statSavingValue={characterCharismaSave}
                  checkboxName="characterCharismaSaveChecked"
                  checked={characterCharismaSaveChecked}
                  setChecked={(e) =>
                    setCharacterCharismaSaveChecked(e.target.checked)
                  }
                />
                <p className="text-center text-sm">Saving Throws</p>
              </div>
              <div className="grid grid-cols-1 mt-1 border-2 p-1 justify-end items-end">
                <SavingThrows
                  savingName="acrobatics"
                  label="Acrobatics"
                  setSavingValue={(e) => setCharacterAcrobatics(e.target.value)}
                  statSavingValue={characterAcrobatics}
                  checkboxName="characterAcrobaticsChecked"
                  checked={characterAcrobaticsChecked}
                  setChecked={(e) =>
                    setCharacterAcrobaticsChecked(e.target.checked)
                  }
                />
                <SavingThrows
                  savingName="animalHandling"
                  label="Animal Handling"
                  setSavingValue={(e) =>
                    setCharacterAnimalHandling(e.target.value)
                  }
                  statSavingValue={characterAnimalHandling}
                  checkboxName="characterAnimalHandlingChecked"
                  checked={characterAnimalHandlingChecked}
                  setChecked={(e) =>
                    setCharacterAnimalHandlingChecked(e.target.checked)
                  }
                />
                <SavingThrows
                  savingName="arcana"
                  label="Arcana"
                  setSavingValue={(e) => setCharacterArcana(e.target.value)}
                  statSavingValue={characterArcana}
                  checkboxName="characterArcanaChecked"
                  checked={characterArcanaChecked}
                  setChecked={(e) =>
                    setCharacterArcanaChecked(e.target.checked)
                  }
                />
                <SavingThrows
                  savingName="athletics"
                  label="Athletics"
                  setSavingValue={(e) => setCharacterAthletics(e.target.value)}
                  statSavingValue={characterAthletics}
                  checkboxName="characterAthleticsChecked"
                  checked={characterAthleticsChecked}
                  setChecked={(e) =>
                    setCharacterAthleticsChecked(e.target.checked)
                  }
                />
                <SavingThrows
                  savingName="deception"
                  label="Deception"
                  setSavingValue={(e) => setCharacterDeception(e.target.value)}
                  statSavingValue={characterDeception}
                  checkboxName="characterDeceptionChecked"
                  checked={characterDeceptionChecked}
                  setChecked={(e) =>
                    setCharacterDeceptionChecked(e.target.checked)
                  }
                />
                <SavingThrows
                  savingName="history"
                  label="History"
                  setSavingValue={(e) => setCharacterHistory(e.target.value)}
                  statSavingValue={characterHistory}
                  checkboxName="characterHistoryChecked"
                  checked={characterHistoryChecked}
                  setChecked={(e) =>
                    setCharacterHistoryChecked(e.target.checked)
                  }
                />
                <SavingThrows
                  savingName="insight"
                  label="Insight"
                  setSavingValue={(e) => setCharacterInsight(e.target.value)}
                  statSavingValue={characterInsight}
                  checkboxName="characterInsightChecked"
                  checked={characterInsightChecked}
                  setChecked={(e) =>
                    setCharacterInsightChecked(e.target.checked)
                  }
                />
                <SavingThrows
                  savingName="intimidation"
                  label="Intimidation"
                  setSavingValue={(e) =>
                    setCharacterIntimidation(e.target.value)
                  }
                  statSavingValue={characterIntimidation}
                  checkboxName="characterIntimidationChecked"
                  checked={characterIntimidationChecked}
                  setChecked={(e) =>
                    setCharacterIntimidationChecked(e.target.checked)
                  }
                />
                <SavingThrows
                  savingName="investigation"
                  label="Investigation"
                  setSavingValue={(e) =>
                    setCharacterInvestigation(e.target.value)
                  }
                  statSavingValue={characterInvestigation}
                  checkboxName="characterInvestigationChecked"
                  checked={characterInvestigationChecked}
                  setChecked={(e) =>
                    setCharacterInvestigationChecked(e.target.checked)
                  }
                />
                <SavingThrows
                  savingName="medicine"
                  label="Medicine"
                  setSavingValue={(e) => setCharacterMedicine(e.target.value)}
                  statSavingValue={characterMedicine}
                  checkboxName="characterMedicineChecked"
                  checked={characterMedicineChecked}
                  setChecked={(e) =>
                    setCharacterMedicineChecked(e.target.checked)
                  }
                />
                <SavingThrows
                  savingName="nature"
                  label="Nature"
                  setSavingValue={(e) => setCharacterNature(e.target.value)}
                  statSavingValue={characterNature}
                  checkboxName="characterNatureChecked"
                  checked={characterNatureChecked}
                  setChecked={(e) =>
                    setCharacterNatureChecked(e.target.checked)
                  }
                />
                <SavingThrows
                  savingName="perception"
                  label="Perception"
                  setSavingValue={(e) => setCharacterPerception(e.target.value)}
                  statSavingValue={characterPerception}
                  checkboxName="characterPerceptionChecked"
                  checked={characterPerceptionChecked}
                  setChecked={(e) =>
                    setCharacterPerceptionChecked(e.target.checked)
                  }
                />
                <SavingThrows
                  savingName="performance"
                  label="Performance"
                  setSavingValue={(e) =>
                    setCharacterPerformance(e.target.value)
                  }
                  statSavingValue={characterPerformance}
                  checkboxName="characterPerformanceChecked"
                  checked={characterPerformanceChecked}
                  setChecked={(e) =>
                    setCharacterPerformanceChecked(e.target.checked)
                  }
                />
                <SavingThrows
                  savingName="persuasion"
                  label="Persuasion"
                  setSavingValue={(e) => setCharacterPersuasion(e.target.value)}
                  statSavingValue={characterPersuasion}
                  checkboxName="characterPersuasionChecked"
                  checked={characterPersuasionChecked}
                  setChecked={(e) =>
                    setCharacterPersuasionChecked(e.target.checked)
                  }
                />
                <SavingThrows
                  savingName="religion"
                  label="Religion"
                  setSavingValue={(e) => setCharacterReligion(e.target.value)}
                  statSavingValue={characterReligion}
                  checkboxName="characterReligionChecked"
                  checked={characterReligionChecked}
                  setChecked={(e) =>
                    setCharacterReligionChecked(e.target.checked)
                  }
                />
                <SavingThrows
                  savingName="slightOfHand"
                  label="Sleight of Hand"
                  setSavingValue={(e) =>
                    setCharacterSleightOfHand(e.target.value)
                  }
                  statSavingValue={characterSleightOfHand}
                  checkboxName="characterSleightOfHandChecked"
                  checked={characterSleightOfHandChecked}
                  setChecked={(e) =>
                    setCharacterSleightOfHandChecked(e.target.checked)
                  }
                />
                <SavingThrows
                  savingName="stealth"
                  label="Stealth"
                  setSavingValue={(e) => setCharacterStealth(e.target.value)}
                  statSavingValue={characterStealth}
                  checkboxName="characterStealthChecked"
                  checked={characterStealthChecked}
                  setChecked={(e) =>
                    setCharacterStealthChecked(e.target.checked)
                  }
                />
                <SavingThrows
                  savingName="survival"
                  label="Survival"
                  setSavingValue={(e) => setCharacterSurvival(e.target.value)}
                  statSavingValue={characterSurvival}
                  checkboxName="characterSurvivalChecked"
                  checked={characterSurvivalChecked}
                  setChecked={(e) =>
                    setCharacterSurvivalChecked(e.target.checked)
                  }
                />
                <p className="text-center text-sm">Skills</p>
                <div className="text-center border-2 h-24">
                  Passive Wisdom (Perception)
                  <input
                    type="number"
                    placeholder="0"
                    className="border rounded-md p-2 text-sm text-white text-center w-16"
                    name="passiveWisdom"
                    value={characterPassiveWisdom}
                    onChange={(e) => setCharacterPassiveWisdom(e.target.value)}
                  />
                </div>
              </div>
              {/* removed until mobile is formatted. This destroyed the mobile page */}
            </div>
            <div className="space-y-1 w-1/2">
              <div className="grid grid-cols-3 gap-4 border-2 p-1">
                <Attribute
                  name="maxHP"
                  label="Max HP"
                  attributeValue={characterMaxHP}
                  setAttributeValue={(e) => setCharacterMaxHP(e.target.value)}
                />
                <Attribute
                  name="currentHP"
                  label="Current HP"
                  attributeValue={characterCurrentHP}
                  setAttributeValue={(e) =>
                    setCharacterCurrentHP(e.target.value)
                  }
                />
                <Attribute
                  name="tempHP"
                  label="Temp HP"
                  attributeValue={characterTempHP}
                  setAttributeValue={(e) => setCharacterTempHP(e.target.value)}
                />
              </div>
              <div className="mt-1 grid grid-cols-3 gap-4 border-2 p-1">
                <Attribute
                  name="ac"
                  label="Armor Class"
                  attributeValue={characterAC}
                  setAttributeValue={(e) => setCharacterAC(e.target.value)}
                />
                <Attribute
                  name="initiative"
                  label="Initiative"
                  attributeValue={characterInitiative}
                  setAttributeValue={(e) =>
                    setCharacterInitiative(e.target.value)
                  }
                />
                <Attribute
                  name="speed"
                  label="Speed"
                  attributeValue={characterSpeed}
                  setAttributeValue={(e) => setCharacterSpeed(e.target.value)}
                />
              </div>
              <div className="flex text-center mt-1 space-x-1">
                <div className="w-1/2 border-2">
                  <HitDice
                    hitDice1="hitDice1"
                    hitDice2="hitDice2"
                    name="hitDice"
                    label="Total"
                    setHitDice1={(e) => setCharacterHitDice1(e.target.value)}
                    hitDice1Value={characterHitDice1}
                    setHitDice2={(e) => setCharacterHitDice2(e.target.value)}
                    hitDice2Value={characterHitDice2}
                  />
                  Hit Dice
                </div>
                <div className="w-1/2 border-2">
                  <div>
                    <DeathSaves label="Success" />
                    <DeathSaves label="Failure" />
                  </div>
                  Death Saves
                </div>
              </div>
              <div className="text-xl text-center border-2 p-1 mt-1">
                <AttAndSpells
                  name="attacksAndSpells"
                  attName1Value={characterAttName1}
                  setAttName1={(e) => setCharacterAttName1(e.target.value)}
                  attBonus1Value={characterAttBonus1}
                  setAttBonus1={(e) => setCharacterAttBonus1(e.target.value)}
                  attDmg1Value={characterAttDamage1}
                  setAttDmg1={(e) => setCharacterAttDamage1(e.target.value)}
                  attName2Value={characterAttName2}
                  setAttName2={(e) => setCharacterAttName2(e.target.value)}
                  attBonus2Value={characterAttBonus2}
                  setAttBonus2={(e) => setCharacterAttBonus2(e.target.value)}
                  attDmg2Value={characterAttDamage2}
                  setAttDmg2={(e) => setCharacterAttDamage2(e.target.value)}
                  attName3Value={characterAttName3}
                  setAttName3={(e) => setCharacterAttName3(e.target.value)}
                  attBonus3Value={characterAttBonus3}
                  setAttBonus3={(e) => setCharacterAttBonus3(e.target.value)}
                  attDmg3Value={characterAttDamage3}
                  setAttDmg3={(e) => setCharacterAttDamage3(e.target.value)}
                  attAndSpellsTextValue={characterAttackAndSpellsTextArea}
                  setAttAndSpellsText={(e) =>
                    setCharacterAttackAndSpellsTextArea(e.target.value)
                  }
                />
              </div>
              <div>
                <CharacterText
                  textAreaName="equipment"
                  label="Equipment"
                  className="col-span-2"
                  setTextAreaValue={(e) =>
                    setCharacterEquipment(e.target.value)
                  }
                  textAreaValue={characterEquipment}
                />
              </div>
              <div>
                <CharacterText
                  textAreaName="proficienciesAndLanguages"
                  className="col-span-2"
                  label="Proficiencies & Languages"
                  setTextAreaValue={(e) =>
                    setCharacterProficienciesAndLanguages(e.target.value)
                  }
                  textAreaValue={characterProficienciesAndLanguages}
                />
              </div>
            </div>
            <div className="space-y-1">
              <div className="grid grid-cols-1 border-2 p-1">
                <CharacterText
                  textAreaName="personalityTraits"
                  label="Personality Traits"
                  setTextAreaValue={(e) =>
                    setCharacterPersonalityTraits(e.target.value)
                  }
                  textAreaValue={characterPersonalityTraits}
                />
                <CharacterText
                  textAreaName="ideals"
                  label="Ideals"
                  setTextAreaValue={(e) => setCharacterIdeals(e.target.value)}
                  textAreaValue={characterIdeals}
                />
                <CharacterText
                  textAreaName="bonds"
                  label="Bonds"
                  setTextAreaValue={(e) => setCharacterBonds(e.target.value)}
                  textAreaValue={characterBonds}
                />
                <CharacterText
                  textAreaName="flaws"
                  label="Flaws"
                  setTextAreaValue={(e) => setCharacterFlaws(e.target.value)}
                  textAreaValue={characterFlaws}
                />
              </div>
              <div className="grid grid-cols-1 border-2 p-1">
                <CharacterText
                  textAreaName="featuresAndTraits"
                  label="Features & Traits"
                  setTextAreaValue={(e) =>
                    setCharacterFeaturesAndTraits(e.target.value)
                  }
                  textAreaValue={characterFeaturesAndTraits}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sheet Two */}
      <main className="flex flex-col items-center">
        <div className="bg-white rounded-md shadow-md p-4 w-full">
          <div className="flex">
            <div className="grid grid-cols-2">
              <div>
                Character Name
                <input
                  type="text"
                  placeholder="Name"
                  defaultValue={characterName}
                  onChange={(e) => setCharacterName(e.target.value)}
                  name="name"
                  className="border rounded-md p-2 text-lg w-full"
                />
              </div>
              <div className="grid grid-cols-3">
                <div>
                  Age
                  <input
                    type="number"
                    placeholder="Age"
                    value={characterAge}
                    onChange={(e) => setCharacterAge(e.target.value)}
                    name="age"
                    className="border rounded-md p-2 text-lg w-full"
                  />
                </div>
                <div>
                  Height
                  <input
                    type="text"
                    placeholder="Height"
                    value={characterHeight}
                    onChange={(e) => setCharacterHeight(e.target.value)}
                    name="height"
                    className="border rounded-md p-2 text-lg w-full"
                  />
                </div>
                <div>
                  Weight
                  <input
                    type="text"
                    placeholder="Weight"
                    value={characterWeight}
                    onChange={(e) => setCharacterWeight(e.target.value)}
                    name="weight"
                    className="border rounded-md p-2 text-lg w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="flex col-start-2">
              <div>
                Eyes
                <input
                  type="text"
                  placeholder="Eyes"
                  value={characterEyes}
                  onChange={(e) => setCharacterEyes(e.target.value)}
                  name="eyes"
                  className="border rounded-md p-2 text-lg w-full"
                />
              </div>
              <div>
                Skin
                <input
                  type="text"
                  placeholder="Skin"
                  value={characterSkin}
                  onChange={(e) => setCharacterSkin(e.target.value)}
                  name="skin"
                  className="border rounded-md p-2 text-lg w-full"
                />
              </div>
              <div>
                Hair
                <input
                  type="text"
                  placeholder="Hair"
                  value={characterHair}
                  onChange={(e) => setCharacterHair(e.target.value)}
                  name="hair"
                  className="border rounded-md p-2 text-lg w-full"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <div className="grid grid-cols-3 space-x-1">
              <div className="border-2 p-1">
                <CharacterText
                  textAreaName="characterAppearance"
                  label="Character Appearance"
                  setTextAreaValue={(e) =>
                    setCharacterDescription(e.target.value)
                  }
                  textAreaValue={characterDescription}
                />
              </div>
              <div className="border-2 p-1 col-span-2">
                <CharacterText
                  textAreaName="alliesAndOrganizations"
                  label="Allies and Organizations"
                  setTextAreaValue={(e) =>
                    setCharacterAlliesAndOrganizations(e.target.value)
                  }
                  textAreaValue={characterAlliesAndOrganizations}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 space-x-1">
              <div className="border-2 p-1">
                <CharacterText
                  textAreaName="characterBackground"
                  label="Character Background"
                  setTextAreaValue={(e) =>
                    setCharacterBackground(e.target.value)
                  }
                  textAreaValue={characterBackground}
                />
              </div>
              <div className="border-2 p-1 col-span-2">
                <CharacterText
                  textAreaName="additionalFeaturesAndTraits"
                  label="Additional Features & Traits"
                  setTextAreaValue={(e) =>
                    setCharacterAdditionalFeaturesAndTraits(e.target.value)
                  }
                  textAreaValue={characterAdditionalFeaturesAndTraits}
                />
                <CharacterText
                  textAreaName="treasures"
                  label="Treasures"
                  setTextAreaValue={(e) =>
                    setCharacterTreasures(e.target.value)
                  }
                  textAreaValue={characterTreasures}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sheet Three */}
      <main className="flex flex-col items-center">
        <div className="bg-white rounded-md shadow-md p-4 w-full">
          <div className="flex">
            <div className="grid grid-cols-2">
              <div>
                Character Name
                <input
                  type="text"
                  placeholder="Name"
                  defaultValue={characterName}
                  onChange={(e) => setCharacterName(e.target.value)}
                  name="name"
                  className="border rounded-md p-2 text-lg w-full"
                />
              </div>
              <div className="grid grid-cols-3">
                <div>
                  Spell Ability
                  <input
                    type="text"
                    placeholder="Spell Ability"
                    defaultValue={characterSpellAbility}
                    onChange={(e) => setCharacterSpellAbility(e.target.value)}
                    name="spellAbility"
                    className="border rounded-md p-2 text-lg w-full"
                  />
                </div>
                <div>
                  Spell Save DC
                  <input
                    type="text"
                    placeholder="Spell Save DC"
                    defaultValue={characterSpellSaveDC}
                    onChange={(e) => setCharacterSpellSaveDC(e.target.value)}
                    name="spellSaveDC"
                    className="border rounded-md p-2 text-lg w-full"
                  />
                </div>
                <div>
                  Spell Att Bonus
                  <input
                    type="text"
                    placeholder="Spell Att Bonus"
                    defaultValue={characterSpellAttackBonus}
                    onChange={(e) =>
                      setCharacterSpellAttackBonus(e.target.value)
                    }
                    name="spellAttBonus"
                    className="border rounded-md p-2 text-lg w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <div className="grid grid-cols-3 space-x-1">
              <div className="p-1 space-y-1">
                <div className="border-2">
                  <CharacterCantrips
                    cantrip="cantripNumber"
                    label="Cantrips"
                    cantripNumber={characterCantripNumber}
                    setCantripNumber={(e) =>
                      setCharacterCantripNumber(e.target.value)
                    }
                  />
                  <SpellNames
                    spell={characterCantrip1}
                    setSpell={(e) => setCharacterCantrip1(e.target.value)}
                    checked={characterCantrip1Checked}
                    setChecked={(e) =>
                      setCharacterCantrip1Checked(e.target.checked)
                    }
                    spellName="cantrip1"
                  />
                  <SpellNames
                    spellName="cantrip2"
                    spell={characterCantrip2}
                    setSpell={(e) => setCharacterCantrip2(e.target.value)}
                    checked={characterCantrip2Checked}
                    setChecked={(e) =>
                      setCharacterCantrip2Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="cantrip3"
                    spell={characterCantrip3}
                    setSpell={(e) => setCharacterCantrip3(e.target.value)}
                    checked={characterCantrip3Checked}
                    setChecked={(e) =>
                      setCharacterCantrip3Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="cantrip4"
                    spell={characterCantrip4}
                    setSpell={(e) => setCharacterCantrip4(e.target.value)}
                    checked={characterCantrip4Checked}
                    setChecked={(e) =>
                      setCharacterCantrip4Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="cantrip5"
                    spell={characterCantrip5}
                    setSpell={(e) => setCharacterCantrip5(e.target.value)}
                    checked={characterCantrip5Checked}
                    setChecked={(e) =>
                      setCharacterCantrip5Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="cantrip6"
                    spell={characterCantrip6}
                    setSpell={(e) => setCharacterCantrip6(e.target.value)}
                    checked={characterCantrip6Checked}
                    setChecked={(e) =>
                      setCharacterCantrip6Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="cantrip7"
                    spell={characterCantrip7}
                    setSpell={(e) => setCharacterCantrip7(e.target.value)}
                    checked={characterCantrip7Checked}
                    setChecked={(e) =>
                      setCharacterCantrip7Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="cantrip8"
                    spell={characterCantrip8}
                    setSpell={(e) => setCharacterCantrip8(e.target.value)}
                    checked={characterCantrip8Checked}
                    setChecked={(e) =>
                      setCharacterCantrip8Checked(e.target.checked)
                    }
                  />
                </div>
                <div className="border-2 p-1">
                  <CharacterSpells
                    level="1"
                    slotsTotalName="spellLevel1Total"
                    slotsTotalValue={spellLevel1Total}
                    setSlotsTotalValue={(e) =>
                      setSpellLevel1Total(e.target.value)
                    }
                    slotsUsedName="spellLevel1Used"
                    slotsUsedValue={spellLevel1Used}
                    setSlotsUsedValue={(e) =>
                      setSpellLevel1Used(e.target.value)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel1Spell1"
                    spell={characterSpellLevel1Spell1}
                    setSpell={(e) =>
                      setCharacterSpellLevel1Spell1(e.target.value)
                    }
                    checkboxName="characterSpellLevel1Spell1Checked"
                    checked={characterSpellLevel1Spell1Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel1Spell1Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel1Spell2"
                    spell={characterSpellLevel1Spell2}
                    setSpell={(e) =>
                      setCharacterSpellLevel1Spell2(e.target.value)
                    }
                    checkboxName="characterSpellLevel1Spell2Checked"
                    checked={characterSpellLevel1Spell2Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel1Spell2Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel1Spell3"
                    spell={characterSpellLevel1Spell3}
                    setSpell={(e) =>
                      setCharacterSpellLevel1Spell3(e.target.value)
                    }
                    checkboxName="characterSpellLevel1Spell3Checked"
                    checked={characterSpellLevel1Spell3Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel1Spell3Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel1Spell4"
                    spell={characterSpellLevel1Spell4}
                    setSpell={(e) =>
                      setCharacterSpellLevel1Spell4(e.target.value)
                    }
                    checkboxName="characterSpellLevel1Spell4Checked"
                    checked={characterSpellLevel1Spell4Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel1Spell4Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel1Spell5"
                    spell={characterSpellLevel1Spell5}
                    setSpell={(e) =>
                      setCharacterSpellLevel1Spell5(e.target.value)
                    }
                    checkboxName="characterSpellLevel1Spell5Checked"
                    checked={characterSpellLevel1Spell5Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel1Spell5Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel1Spell6"
                    spell={characterSpellLevel1Spell6}
                    setSpell={(e) =>
                      setCharacterSpellLevel1Spell6(e.target.value)
                    }
                    checkboxName="characterSpellLevel1Spell6Checked"
                    checked={characterSpellLevel1Spell6Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel1Spell6Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel1Spell7"
                    spell={characterSpellLevel1Spell7}
                    setSpell={(e) =>
                      setCharacterSpellLevel1Spell7(e.target.value)
                    }
                    checkboxName="characterSpellLevel1Spell7Checked"
                    checked={characterSpellLevel1Spell7Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel1Spell7Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel1Spell8"
                    spell={characterSpellLevel1Spell8}
                    setSpell={(e) =>
                      setCharacterSpellLevel1Spell8(e.target.value)
                    }
                    checkboxName="characterSpellLevel1Spell8Checked"
                    checked={characterSpellLevel1Spell8Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel1Spell8Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel1Spell9"
                    spell={characterSpellLevel1Spell9}
                    setSpell={(e) =>
                      setCharacterSpellLevel1Spell9(e.target.value)
                    }
                    checkboxName="characterSpellLevel1Spell9Checked"
                    checked={characterSpellLevel1Spell9Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel1Spell9Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel1Spell10"
                    spell={characterSpellLevel1Spell10}
                    setSpell={(e) =>
                      setCharacterSpellLevel1Spell10(e.target.value)
                    }
                    checkboxName="characterSpellLevel1Spell10Checked"
                    checked={characterSpellLevel1Spell10Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel1Spell10Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel1Spell11"
                    spell={characterSpellLevel1Spell11}
                    setSpell={(e) =>
                      setCharacterSpellLevel1Spell11(e.target.value)
                    }
                    checkboxName="characterSpellLevel1Spell11Checked"
                    checked={characterSpellLevel1Spell11Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel1Spell11Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel1Spell12"
                    spell={characterSpellLevel1Spell12}
                    setSpell={(e) =>
                      setCharacterSpellLevel1Spell12(e.target.value)
                    }
                    checkboxName="characterSpellLevel1Spell12Checked"
                    checked={characterSpellLevel1Spell12Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel1Spell12Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel1Spell13"
                    spell={characterSpellLevel1Spell13}
                    setSpell={(e) =>
                      setCharacterSpellLevel1Spell13(e.target.value)
                    }
                    checkboxName="characterSpellLevel1Spell13Checked"
                    checked={characterSpellLevel1Spell13Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel1Spell13Checked(e.target.checked)
                    }
                  />
                </div>
                <div className="border-2 p-1">
                  <CharacterSpells
                    level="2"
                    slotsTotalName="spellLevel2Total"
                    slotsTotalValue={spellLevel2Total}
                    setSlotsTotalValue={(e) =>
                      setSpellLevel2Total(e.target.value)
                    }
                    slotsUsedName="spellLevel2Used"
                    slotsUsedValue={spellLevel2Used}
                    setSlotsUsedValue={(e) =>
                      setSpellLevel2Used(e.target.value)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel2Spell1"
                    spell={characterSpellLevel2Spell1}
                    setSpell={(e) =>
                      setCharacterSpellLevel2Spell1(e.target.value)
                    }
                    checkboxName="characterSpellLevel2Spell1Checked"
                    checked={characterSpellLevel2Spell1Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel2Spell1Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel2Spell2"
                    spell={characterSpellLevel2Spell2}
                    setSpell={(e) =>
                      setCharacterSpellLevel2Spell2(e.target.value)
                    }
                    checkboxName="characterSpellLevel2Spell2Checked"
                    checked={characterSpellLevel2Spell2Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel2Spell2Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel2Spell3"
                    spell={characterSpellLevel2Spell3}
                    setSpell={(e) =>
                      setCharacterSpellLevel2Spell3(e.target.value)
                    }
                    checkboxName="characterSpellLevel2Spell3Checked"
                    checked={characterSpellLevel2Spell3Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel2Spell3Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel2Spell4"
                    spell={characterSpellLevel2Spell4}
                    setSpell={(e) =>
                      setCharacterSpellLevel2Spell4(e.target.value)
                    }
                    checkboxName="characterSpellLevel2Spell4Checked"
                    checked={characterSpellLevel2Spell4Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel2Spell4Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel2Spell5"
                    spell={characterSpellLevel2Spell5}
                    setSpell={(e) =>
                      setCharacterSpellLevel2Spell5(e.target.value)
                    }
                    checkboxName="characterSpellLevel2Spell5Checked"
                    checked={characterSpellLevel2Spell5Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel2Spell5Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel2Spell6"
                    spell={characterSpellLevel2Spell6}
                    setSpell={(e) =>
                      setCharacterSpellLevel2Spell6(e.target.value)
                    }
                    checkboxName="characterSpellLevel2Spell6Checked"
                    checked={characterSpellLevel2Spell6Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel2Spell6Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel2Spell7"
                    spell={characterSpellLevel2Spell7}
                    setSpell={(e) =>
                      setCharacterSpellLevel2Spell7(e.target.value)
                    }
                    checkboxName="characterSpellLevel2Spell7Checked"
                    checked={characterSpellLevel2Spell7Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel2Spell7Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel2Spell8"
                    spell={characterSpellLevel2Spell8}
                    setSpell={(e) =>
                      setCharacterSpellLevel2Spell8(e.target.value)
                    }
                    checkboxName="characterSpellLevel2Spell8Checked"
                    checked={characterSpellLevel2Spell8Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel2Spell8Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel2Spell9"
                    spell={characterSpellLevel2Spell9}
                    setSpell={(e) =>
                      setCharacterSpellLevel2Spell9(e.target.value)
                    }
                    checkboxName="characterSpellLevel2Spell9Checked"
                    checked={characterSpellLevel2Spell9Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel2Spell9Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel2Spell10"
                    spell={characterSpellLevel2Spell10}
                    setSpell={(e) =>
                      setCharacterSpellLevel2Spell10(e.target.value)
                    }
                    checkboxName="characterSpellLevel2Spell10Checked"
                    checked={characterSpellLevel2Spell10Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel2Spell10Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel2Spell11"
                    spell={characterSpellLevel2Spell11}
                    setSpell={(e) =>
                      setCharacterSpellLevel2Spell11(e.target.value)
                    }
                    checkboxName="characterSpellLevel2Spell11Checked"
                    checked={characterSpellLevel2Spell11Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel2Spell11Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel2Spell12"
                    spell={characterSpellLevel2Spell12}
                    setSpell={(e) =>
                      setCharacterSpellLevel2Spell12(e.target.value)
                    }
                    checkboxName="characterSpellLevel2Spell12Checked"
                    checked={characterSpellLevel2Spell12Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel2Spell12Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel2Spell13"
                    spell={characterSpellLevel2Spell13}
                    setSpell={(e) =>
                      setCharacterSpellLevel2Spell13(e.target.value)
                    }
                    checkboxName="characterSpellLevel2Spell13Checked"
                    checked={characterSpellLevel2Spell13Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel2Spell13Checked(e.target.checked)
                    }
                  />
                </div>
              </div>
              <div className="p-1 space-y-1">
                <div className="border-2 p-1">
                  <CharacterSpells
                    level="3"
                    slotsTotalName="spellLevel3Total"
                    slotsTotalValue={spellLevel3Total}
                    setSlotsTotalValue={(e) =>
                      setSpellLevel3Total(e.target.value)
                    }
                    slotsUsedName="spellLevel3Used"
                    slotsUsedValue={spellLevel3Used}
                    setSlotsUsedValue={(e) =>
                      setSpellLevel3Used(e.target.value)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel3Spell1"
                    spell={characterSpellLevel3Spell1}
                    setSpell={(e) =>
                      setCharacterSpellLevel3Spell1(e.target.value)
                    }
                    checkboxName="characterSpellLevel3Spell1Checked"
                    checked={characterSpellLevel3Spell1Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel3Spell1Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel3Spell2"
                    spell={characterSpellLevel3Spell2}
                    setSpell={(e) =>
                      setCharacterSpellLevel3Spell2(e.target.value)
                    }
                    checkboxName="characterSpellLevel3Spell2Checked"
                    checked={characterSpellLevel3Spell2Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel3Spell2Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel3Spell3"
                    spell={characterSpellLevel3Spell3}
                    setSpell={(e) =>
                      setCharacterSpellLevel3Spell3(e.target.value)
                    }
                    checkboxName="characterSpellLevel3Spell3Checked"
                    checked={characterSpellLevel3Spell3Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel3Spell3Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel3Spell4"
                    spell={characterSpellLevel3Spell4}
                    setSpell={(e) =>
                      setCharacterSpellLevel3Spell4(e.target.value)
                    }
                    checkboxName="characterSpellLevel3Spell4Checked"
                    checked={characterSpellLevel3Spell4Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel3Spell4Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel3Spell5"
                    spell={characterSpellLevel3Spell5}
                    setSpell={(e) =>
                      setCharacterSpellLevel3Spell5(e.target.value)
                    }
                    checkboxName="characterSpellLevel3Spell5Checked"
                    checked={characterSpellLevel3Spell5Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel3Spell5Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel3Spell6"
                    spell={characterSpellLevel3Spell6}
                    setSpell={(e) =>
                      setCharacterSpellLevel3Spell6(e.target.value)
                    }
                    checkboxName="characterSpellLevel3Spell6Checked"
                    checked={characterSpellLevel3Spell6Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel3Spell6Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel3Spell7"
                    spell={characterSpellLevel3Spell7}
                    setSpell={(e) =>
                      setCharacterSpellLevel3Spell7(e.target.value)
                    }
                    checkboxName="characterSpellLevel3Spell7Checked"
                    checked={characterSpellLevel3Spell7Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel3Spell7Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel3Spell8"
                    spell={characterSpellLevel3Spell8}
                    setSpell={(e) =>
                      setCharacterSpellLevel3Spell8(e.target.value)
                    }
                    checkboxName="characterSpellLevel3Spell8Checked"
                    checked={characterSpellLevel3Spell8Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel3Spell8Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel3Spell9"
                    spell={characterSpellLevel3Spell9}
                    setSpell={(e) =>
                      setCharacterSpellLevel3Spell9(e.target.value)
                    }
                    checkboxName="characterSpellLevel3Spell9Checked"
                    checked={characterSpellLevel3Spell9Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel3Spell9Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel3Spell10"
                    spell={characterSpellLevel3Spell10}
                    setSpell={(e) =>
                      setCharacterSpellLevel3Spell10(e.target.value)
                    }
                    checkboxName="characterSpellLevel3Spell10Checked"
                    checked={characterSpellLevel3Spell10Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel3Spell10Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel3Spell11"
                    spell={characterSpellLevel3Spell11}
                    setSpell={(e) =>
                      setCharacterSpellLevel3Spell11(e.target.value)
                    }
                    checkboxName="characterSpellLevel3Spell11Checked"
                    checked={characterSpellLevel3Spell11Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel3Spell11Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel3Spell12"
                    spell={characterSpellLevel3Spell12}
                    setSpell={(e) =>
                      setCharacterSpellLevel3Spell12(e.target.value)
                    }
                    checkboxName="characterSpellLevel3Spell12Checked"
                    checked={characterSpellLevel3Spell12Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel3Spell12Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel3Spell13"
                    spell={characterSpellLevel3Spell13}
                    setSpell={(e) =>
                      setCharacterSpellLevel3Spell13(e.target.value)
                    }
                    checkboxName="characterSpellLevel3Spell13Checked"
                    checked={characterSpellLevel3Spell13Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel3Spell13Checked(e.target.checked)
                    }
                  />
                </div>
                <div className="border-2 p-1">
                  <CharacterSpells
                    level="4"
                    slotsTotalName="spellLevel4Total"
                    slotsTotalValue={spellLevel4Total}
                    setSlotsTotalValue={(e) =>
                      setSpellLevel4Total(e.target.value)
                    }
                    slotsUsedName="spellLevel4Used"
                    slotsUsedValue={spellLevel4Used}
                    setSlotsUsedValue={(e) =>
                      setSpellLevel4Used(e.target.value)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel4Spell1"
                    spell={characterSpellLevel4Spell1}
                    setSpell={(e) =>
                      setCharacterSpellLevel4Spell1(e.target.value)
                    }
                    checkboxName="characterSpellLevel4Spell1Checked"
                    checked={characterSpellLevel4Spell1Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel4Spell1Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel4Spell2"
                    spell={characterSpellLevel4Spell2}
                    setSpell={(e) =>
                      setCharacterSpellLevel4Spell2(e.target.value)
                    }
                    checkboxName="characterSpellLevel4Spell2Checked"
                    checked={characterSpellLevel4Spell2Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel4Spell2Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel4Spell3"
                    spell={characterSpellLevel4Spell3}
                    setSpell={(e) =>
                      setCharacterSpellLevel4Spell3(e.target.value)
                    }
                    checkboxName="characterSpellLevel4Spell3Checked"
                    checked={characterSpellLevel4Spell3Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel4Spell3Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel4Spell4"
                    spell={characterSpellLevel4Spell4}
                    setSpell={(e) =>
                      setCharacterSpellLevel4Spell4(e.target.value)
                    }
                    checkboxName="characterSpellLevel4Spell4Checked"
                    checked={characterSpellLevel4Spell4Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel4Spell4Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel4Spell5"
                    spell={characterSpellLevel4Spell5}
                    setSpell={(e) =>
                      setCharacterSpellLevel4Spell5(e.target.value)
                    }
                    checkboxName="characterSpellLevel4Spell5Checked"
                    checked={characterSpellLevel4Spell5Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel4Spell5Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel4Spell6"
                    spell={characterSpellLevel4Spell6}
                    setSpell={(e) =>
                      setCharacterSpellLevel4Spell6(e.target.value)
                    }
                    checkboxName="characterSpellLevel4Spell6Checked"
                    checked={characterSpellLevel4Spell6Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel4Spell6Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel4Spell7"
                    spell={characterSpellLevel4Spell7}
                    setSpell={(e) =>
                      setCharacterSpellLevel4Spell7(e.target.value)
                    }
                    checkboxName="characterSpellLevel4Spell7Checked"
                    checked={characterSpellLevel4Spell7Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel4Spell7Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel4Spell8"
                    spell={characterSpellLevel4Spell8}
                    setSpell={(e) =>
                      setCharacterSpellLevel4Spell8(e.target.value)
                    }
                    checkboxName="characterSpellLevel4Spell8Checked"
                    checked={characterSpellLevel4Spell8Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel4Spell8Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel4Spell9"
                    spell={characterSpellLevel4Spell9}
                    setSpell={(e) =>
                      setCharacterSpellLevel4Spell9(e.target.value)
                    }
                    checkboxName="characterSpellLevel4Spell9Checked"
                    checked={characterSpellLevel4Spell9Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel4Spell9Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel4Spell10"
                    spell={characterSpellLevel4Spell10}
                    setSpell={(e) =>
                      setCharacterSpellLevel4Spell10(e.target.value)
                    }
                    checkboxName="characterSpellLevel4Spell10Checked"
                    checked={characterSpellLevel4Spell10Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel4Spell10Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel4Spell11"
                    spell={characterSpellLevel4Spell11}
                    setSpell={(e) =>
                      setCharacterSpellLevel4Spell11(e.target.value)
                    }
                    checkboxName="characterSpellLevel4Spell11Checked"
                    checked={characterSpellLevel4Spell11Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel4Spell11Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel4Spell12"
                    spell={characterSpellLevel4Spell12}
                    setSpell={(e) =>
                      setCharacterSpellLevel4Spell12(e.target.value)
                    }
                    checkboxName="characterSpellLevel4Spell12Checked"
                    checked={characterSpellLevel4Spell12Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel4Spell12Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel4Spell13"
                    spell={characterSpellLevel4Spell13}
                    setSpell={(e) =>
                      setCharacterSpellLevel4Spell13(e.target.value)
                    }
                    checkboxName="characterSpellLevel4Spell13Checked"
                    checked={characterSpellLevel4Spell13Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel4Spell13Checked(e.target.checked)
                    }
                  />
                </div>
                <div className="border-2 p-1">
                  <CharacterSpells
                    level="5"
                    slotsTotalName="spellLevel5Total"
                    slotsTotalValue={spellLevel5Total}
                    setSlotsTotalValue={(e) =>
                      setSpellLevel5Total(e.target.value)
                    }
                    slotsUsedName="spellLevel5Used"
                    slotsUsedValue={spellLevel5Used}
                    setSlotsUsedValue={(e) =>
                      setSpellLevel5Used(e.target.value)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel5Spell1"
                    spell={characterSpellLevel5Spell1}
                    setSpell={(e) =>
                      setCharacterSpellLevel5Spell1(e.target.value)
                    }
                    checkboxName="characterSpellLevel5Spell1Checked"
                    checked={characterSpellLevel5Spell1Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel5Spell1Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel5Spell2"
                    spell={characterSpellLevel5Spell2}
                    setSpell={(e) =>
                      setCharacterSpellLevel5Spell2(e.target.value)
                    }
                    checkboxName="characterSpellLevel5Spell2Checked"
                    checked={characterSpellLevel5Spell2Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel5Spell2Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel5Spell3"
                    spell={characterSpellLevel5Spell3}
                    setSpell={(e) =>
                      setCharacterSpellLevel5Spell3(e.target.value)
                    }
                    checkboxName="characterSpellLevel5Spell3Checked"
                    checked={characterSpellLevel5Spell3Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel5Spell3Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel5Spell4"
                    spell={characterSpellLevel5Spell4}
                    setSpell={(e) =>
                      setCharacterSpellLevel5Spell4(e.target.value)
                    }
                    checkboxName="characterSpellLevel5Spell4Checked"
                    checked={characterSpellLevel5Spell4Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel5Spell4Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel5Spell5"
                    spell={characterSpellLevel5Spell5}
                    setSpell={(e) =>
                      setCharacterSpellLevel5Spell5(e.target.value)
                    }
                    checkboxName="characterSpellLevel5Spell5Checked"
                    checked={characterSpellLevel5Spell5Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel5Spell5Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel5Spell6"
                    spell={characterSpellLevel5Spell6}
                    setSpell={(e) =>
                      setCharacterSpellLevel5Spell6(e.target.value)
                    }
                    checkboxName="characterSpellLevel5Spell6Checked"
                    checked={characterSpellLevel5Spell6Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel5Spell6Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel5Spell7"
                    spell={characterSpellLevel5Spell7}
                    setSpell={(e) =>
                      setCharacterSpellLevel5Spell7(e.target.value)
                    }
                    checkboxName="characterSpellLevel5Spell7Checked"
                    checked={characterSpellLevel5Spell7Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel5Spell7Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel5Spell8"
                    spell={characterSpellLevel5Spell8}
                    setSpell={(e) =>
                      setCharacterSpellLevel5Spell8(e.target.value)
                    }
                    checkboxName="characterSpellLevel5Spell8Checked"
                    checked={characterSpellLevel5Spell8Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel5Spell8Checked(e.target.checked)
                    }
                  />
                </div>
              </div>
              <div className="p-1 space-y-1">
                <div className="border-2 p-1">
                  <CharacterSpells
                    level="6"
                    slotsTotalName="spellLevel6Total"
                    slotsTotalValue={spellLevel6Total}
                    setSlotsTotalValue={(e) =>
                      setSpellLevel6Total(e.target.value)
                    }
                    slotsUsedName="spellLevel6Used"
                    slotsUsedValue={spellLevel6Used}
                    setSlotsUsedValue={(e) =>
                      setSpellLevel6Used(e.target.value)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel6Spell1"
                    spell={characterSpellLevel6Spell1}
                    setSpell={(e) =>
                      setCharacterSpellLevel6Spell1(e.target.value)
                    }
                    checkboxName="characterSpellLevel6Spell1Checked"
                    checked={characterSpellLevel6Spell1Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel6Spell1Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel6Spell2"
                    spell={characterSpellLevel6Spell2}
                    setSpell={(e) =>
                      setCharacterSpellLevel6Spell2(e.target.value)
                    }
                    checkboxName="characterSpellLevel6Spell2Checked"
                    checked={characterSpellLevel6Spell2Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel6Spell2Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel6Spell3"
                    spell={characterSpellLevel6Spell3}
                    setSpell={(e) =>
                      setCharacterSpellLevel6Spell3(e.target.value)
                    }
                    checkboxName="characterSpellLevel6Spell3Checked"
                    checked={characterSpellLevel6Spell3Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel6Spell3Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel6Spell4"
                    spell={characterSpellLevel6Spell4}
                    setSpell={(e) =>
                      setCharacterSpellLevel6Spell4(e.target.value)
                    }
                    checkboxName="characterSpellLevel6Spell4Checked"
                    checked={characterSpellLevel6Spell4Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel6Spell4Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel6Spell5"
                    spell={characterSpellLevel6Spell5}
                    setSpell={(e) =>
                      setCharacterSpellLevel6Spell5(e.target.value)
                    }
                    checkboxName="characterSpellLevel6Spell5Checked"
                    checked={characterSpellLevel6Spell5Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel6Spell5Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel6Spell6"
                    spell={characterSpellLevel6Spell6}
                    setSpell={(e) =>
                      setCharacterSpellLevel6Spell6(e.target.value)
                    }
                    checkboxName="characterSpellLevel6Spell6Checked"
                    checked={characterSpellLevel6Spell6Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel6Spell6Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel6Spell7"
                    spell={characterSpellLevel6Spell7}
                    setSpell={(e) =>
                      setCharacterSpellLevel6Spell7(e.target.value)
                    }
                    checkboxName="characterSpellLevel6Spell7Checked"
                    checked={characterSpellLevel6Spell7Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel6Spell7Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel6Spell8"
                    spell={characterSpellLevel6Spell8}
                    setSpell={(e) =>
                      setCharacterSpellLevel6Spell8(e.target.value)
                    }
                    checkboxName="characterSpellLevel6Spell8Checked"
                    checked={characterSpellLevel6Spell8Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel6Spell8Checked(e.target.checked)
                    }
                  />
                </div>
                <div className="border-2 p-1">
                  <CharacterSpells
                    level="7"
                    slotsTotalName="spellLevel7Total"
                    slotsTotalValue={spellLevel7Total}
                    setSlotsTotalValue={(e) =>
                      setSpellLevel7Total(e.target.value)
                    }
                    slotsUsedName="spellLevel7Used"
                    slotsUsedValue={spellLevel7Used}
                    setSlotsUsedValue={(e) =>
                      setSpellLevel7Used(e.target.value)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel7Spell1"
                    spell={characterSpellLevel7Spell1}
                    setSpell={(e) =>
                      setCharacterSpellLevel7Spell1(e.target.value)
                    }
                    checkboxName="characterSpellLevel7Spell1Checked"
                    checked={characterSpellLevel7Spell1Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel7Spell1Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel7Spell2"
                    spell={characterSpellLevel7Spell2}
                    setSpell={(e) =>
                      setCharacterSpellLevel7Spell2(e.target.value)
                    }
                    checkboxName="characterSpellLevel7Spell2Checked"
                    checked={characterSpellLevel7Spell2Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel7Spell2Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel7Spell3"
                    spell={characterSpellLevel7Spell3}
                    setSpell={(e) =>
                      setCharacterSpellLevel7Spell3(e.target.value)
                    }
                    checkboxName="characterSpellLevel7Spell3Checked"
                    checked={characterSpellLevel7Spell3Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel7Spell3Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel7Spell4"
                    spell={characterSpellLevel7Spell4}
                    setSpell={(e) =>
                      setCharacterSpellLevel7Spell4(e.target.value)
                    }
                    checkboxName="characterSpellLevel7Spell4Checked"
                    checked={characterSpellLevel7Spell4Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel7Spell4Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel7Spell5"
                    spell={characterSpellLevel7Spell5}
                    setSpell={(e) =>
                      setCharacterSpellLevel7Spell5(e.target.value)
                    }
                    checkboxName="characterSpellLevel7Spell5Checked"
                    checked={characterSpellLevel7Spell5Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel7Spell5Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel7Spell6"
                    spell={characterSpellLevel7Spell7}
                    setSpell={(e) =>
                      setCharacterSpellLevel7Spell7(e.target.value)
                    }
                    checkboxName="characterSpellLevel7Spell7Checked"
                    checked={characterSpellLevel7Spell7Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel7Spell7Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel7Spell7"
                    spell={characterSpellLevel7Spell7}
                    setSpell={(e) =>
                      setCharacterSpellLevel7Spell7(e.target.value)
                    }
                    checkboxName="characterSpellLevel7Spell7Checked"
                    checked={characterSpellLevel7Spell7Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel7Spell7Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel7Spell8"
                    spell={characterSpellLevel7Spell8}
                    setSpell={(e) =>
                      setCharacterSpellLevel7Spell8(e.target.value)
                    }
                    checkboxName="characterSpellLevel7Spell8Checked"
                    checked={characterSpellLevel7Spell8Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel7Spell8Checked(e.target.checked)
                    }
                  />
                </div>
                <div className="border-2 p-1">
                  <CharacterSpells
                    level="8"
                    slotsTotalName="spellLevel8Total"
                    slotsTotalValue={spellLevel8Total}
                    setSlotsTotalValue={(e) =>
                      setSpellLevel8Total(e.target.value)
                    }
                    slotsUsedName="spellLevel8Used"
                    slotsUsedValue={spellLevel8Used}
                    setSlotsUsedValue={(e) =>
                      setSpellLevel8Used(e.target.value)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel8Spell1"
                    spell={characterSpellLevel8Spell1}
                    setSpell={(e) =>
                      setCharacterSpellLevel8Spell1(e.target.value)
                    }
                    checkboxName="characterSpellLevel8Spell1Checked"
                    checked={characterSpellLevel8Spell1Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel8Spell1Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel8Spell2"
                    spell={characterSpellLevel8Spell2}
                    setSpell={(e) =>
                      setCharacterSpellLevel8Spell2(e.target.value)
                    }
                    checkboxName="characterSpellLevel8Spell2Checked"
                    checked={characterSpellLevel8Spell2Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel8Spell2Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel8Spell3"
                    spell={characterSpellLevel8Spell3}
                    setSpell={(e) =>
                      setCharacterSpellLevel8Spell3(e.target.value)
                    }
                    checkboxName="characterSpellLevel8Spell3Checked"
                    checked={characterSpellLevel8Spell3Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel8Spell3Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel8Spell4"
                    spell={characterSpellLevel8Spell4}
                    setSpell={(e) =>
                      setCharacterSpellLevel8Spell4(e.target.value)
                    }
                    checkboxName="characterSpellLevel8Spell4Checked"
                    checked={characterSpellLevel8Spell4Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel8Spell4Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel8Spell5"
                    spell={characterSpellLevel8Spell5}
                    setSpell={(e) =>
                      setCharacterSpellLevel8Spell5(e.target.value)
                    }
                    checkboxName="characterSpellLevel8Spell5Checked"
                    checked={characterSpellLevel8Spell5Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel8Spell5Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel8Spell6"
                    spell={characterSpellLevel8Spell6}
                    setSpell={(e) =>
                      setCharacterSpellLevel8Spell6(e.target.value)
                    }
                    checkboxName="characterSpellLevel8Spell6Checked"
                    checked={characterSpellLevel8Spell6Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel8Spell6Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel8Spell7"
                    spell={characterSpellLevel8Spell7}
                    setSpell={(e) =>
                      setCharacterSpellLevel8Spell7(e.target.value)
                    }
                    checkboxName="characterSpellLevel8Spell7Checked"
                    checked={characterSpellLevel8Spell7Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel8Spell7Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel8Spell8"
                    spell={characterSpellLevel8Spell8}
                    setSpell={(e) =>
                      setCharacterSpellLevel8Spell8(e.target.value)
                    }
                    checkboxName="characterSpellLevel8Spell8Checked"
                    checked={characterSpellLevel8Spell8Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel8Spell8Checked(e.target.checked)
                    }
                  />
                </div>
                <div className="border-2 p-1">
                  <CharacterSpells
                    level="9"
                    slotsTotalName="spellLevel9Total"
                    slotsTotalValue={spellLevel9Total}
                    setSlotsTotalValue={(e) =>
                      setSpellLevel9Total(e.target.value)
                    }
                    slotsUsedName="spellLevel9Used"
                    slotsUsedValue={spellLevel9Used}
                    setSlotsUsedValue={(e) =>
                      setSpellLevel9Used(e.target.value)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel9Spell1"
                    spell={characterSpellLevel9Spell1}
                    setSpell={(e) =>
                      setCharacterSpellLevel9Spell1(e.target.value)
                    }
                    checkboxName="characterSpellLevel9Spell1Checked"
                    checked={characterSpellLevel9Spell1Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel9Spell1Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel9Spell2"
                    spell={characterSpellLevel9Spell2}
                    setSpell={(e) =>
                      setCharacterSpellLevel9Spell2(e.target.value)
                    }
                    checkboxName="characterSpellLevel9Spell2Checked"
                    checked={characterSpellLevel9Spell2Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel9Spell2Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel9Spell3"
                    spell={characterSpellLevel9Spell3}
                    setSpell={(e) =>
                      setCharacterSpellLevel9Spell3(e.target.value)
                    }
                    checkboxName="characterSpellLevel9Spell3Checked"
                    checked={characterSpellLevel9Spell3Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel9Spell3Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel9Spell4"
                    spell={characterSpellLevel9Spell4}
                    setSpell={(e) =>
                      setCharacterSpellLevel9Spell4(e.target.value)
                    }
                    checkboxName="characterSpellLevel9Spell4Checked"
                    checked={characterSpellLevel9Spell4Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel9Spell4Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel9Spell5"
                    spell={characterSpellLevel9Spell5}
                    setSpell={(e) =>
                      setCharacterSpellLevel9Spell5(e.target.value)
                    }
                    checkboxName="characterSpellLevel9Spell5Checked"
                    checked={characterSpellLevel9Spell5Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel9Spell5Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel9Spell6"
                    spell={characterSpellLevel9Spell6}
                    setSpell={(e) =>
                      setCharacterSpellLevel9Spell6(e.target.value)
                    }
                    checkboxName="characterSpellLevel9Spell6Checked"
                    checked={characterSpellLevel9Spell6Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel9Spell6Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel9Spell7"
                    spell={characterSpellLevel9Spell7}
                    setSpell={(e) =>
                      setCharacterSpellLevel9Spell7(e.target.value)
                    }
                    checkboxName="characterSpellLevel9Spell7Checked"
                    checked={characterSpellLevel9Spell7Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel9Spell7Checked(e.target.checked)
                    }
                  />
                  <SpellNames
                    spellName="spellLevel9Spell8"
                    spell={characterSpellLevel9Spell8}
                    setSpell={(e) =>
                      setCharacterSpellLevel9Spell8(e.target.value)
                    }
                    checkboxName="characterSpellLevel9Spell8Checked"
                    checked={characterSpellLevel9Spell8Checked}
                    setChecked={(e) =>
                      setCharacterSpellLevel9Spell8Checked(e.target.checked)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </form>
  );
}
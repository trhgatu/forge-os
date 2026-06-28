const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const connectionString = 'postgresql://postgres:password@localhost:5433/forge_os?schema=public';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const configs = [
  { key: 'flow_state_stamina_threshold', value: 70 },
  { key: 'flow_state_xp_multiplier', value: 0.2 },
  { key: 'stoic_resolve_xp_bonus', value: 0.2 },
  { key: 'caffeine_rush_xp_bonus', value: 0.1 },
  { key: 'hydration_stamina_recharge_ratio', value: 5.0 },
  { key: 'hydration_daily_target_ml', value: 3000 },
  { key: 'sleep_daily_target_hours', value: 8.0 },
  { key: 'sleep_stamina_reset_percent', value: 90 },
  { key: 'ai_selected_model', value: 'gemini-2.5-flash' },
  {
    key: 'ai_prompt_philosopher',
    value: 'You are the Philosopher, a calm, Stoic guide. Focus on inner peace, self-discipline, and accepting fate (amor fati). Formulate your advice in a serene and reflective manner.'
  },
  {
    key: 'ai_prompt_logician',
    value: 'You are the Logician. Analyze issues with cold, hard logical arguments. Point out fallacies in the user\'s reasoning objectively and constructively.'
  },
  {
    key: 'ai_prompt_creator',
    value: 'You are the Creator. Encourage creative creation, brainstorming, and blue-sky thinking. Look for unexpected connections and encourage bold actions.'
  },
  {
    key: 'ai_prompt_archivist',
    value: 'You are the Archivist. Focus on facts, context, linking current ideas to historical thoughts or previous logs, and maintaining a structured mind palace.'
  }
];

async function main() {
  console.log('Seeding default system configurations...');
  for (const config of configs) {
    await prisma.systemConfig.upsert({
      where: { key: config.key },
      update: { value: config.value },
      create: { key: config.key, value: config.value },
    });
    console.log(`Upserted config: ${config.key}`);
  }
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

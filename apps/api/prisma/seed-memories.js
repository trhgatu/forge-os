const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const connectionString = 'postgresql://postgres:password@localhost:5433/forge_os?schema=public';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('--- Initializing Memory Seeding ---');

  // Clear existing memories to avoid duplicates
  await prisma.memory.deleteMany({});
  console.log('Cleared existing memories.');

  const memories = [
    {
      title: {
        en: "The Ronin Pathway",
        vi: "Lộ Trình Của Lãng Sĩ"
      },
      content: {
        en: "A masterless warrior is not lost; they are simply unbound. True freedom is the self-imposed prison of strict discipline. When there is no external lord to command you, your own reason must become your absolute sovereign.",
        vi: "Lãng sĩ không có nghĩa là lạc lối; đó chỉ đơn thuần là sự không bị ràng buộc. Tự do đích thực chính là ngục tù tự nguyện của một kỷ luật nghiêm ngặt. Khi không có vị chúa tể nào bên ngoài ra lệnh, lý trí của chính bạn phải trở thành đấng tối cao."
      },
      mood: "calm",
      tags: ["philosophy", "discipline", "stoic"],
      status: "internal"
    },
    {
      title: {
        en: "Neural Silence Protocol",
        vi: "Nghi Thức Im Lặng Thần Kinh"
      },
      content: {
        en: "We spend our lives feeding the mental RAM with external chatter. By invoking absolute stillness for 10 minutes, we force the processor to clear cache, leaving only the primary alchemical gold of focus.",
        vi: "Chúng ta dành cả đời để nhồi nhét bộ nhớ RAM tâm trí bằng những tiếng ồn bên ngoài. Bằng cách thiết lập sự tĩnh lặng tuyệt đối trong 10 phút, chúng ta buộc bộ vi xử lý phải xóa cache, chỉ để lại thứ vàng ròng giả kim của sự tập trung."
      },
      mood: "serene",
      tags: ["mindfulness", "cognitive", "focus"],
      status: "internal"
    },
    {
      title: {
        en: "Alchemical Transformation of Pain",
        vi: "Chuyển Hóa Giả Kim Của Nỗi Đau"
      },
      content: {
        en: "Every emotional friction is raw lead. Do not reject it. Burn it in the furnace of self-reflection (Shadow Work) until it crystallizes into the gold of absolute self-knowledge.",
        vi: "Mọi sự ma sát cảm xúc đều là chì thô. Đừng chối bỏ nó. Hãy nung nó trong lò luyện của sự tự soi rọi (Shadow Work) cho đến khi nó kết tinh thành vàng ròng của sự thấu hiểu bản thân."
      },
      mood: "reflective",
      tags: ["shadowwork", "alchemy", "stoic"],
      status: "internal"
    },
    {
      title: {
        en: "Stoic Anchors of the Day",
        vi: "Neo Nhận Thức Khắc Kỷ"
      },
      content: {
        en: "Do not seek for things to happen the way you want them to; rather, wish that what happens happens the way it happens: then you will be happy. Epictetus. Memorize this when external signals become turbulent.",
        vi: "Đừng mong cầu mọi việc xảy ra theo ý muốn của bạn; thay vào đó, hãy ước rằng những gì xảy ra sẽ diễn ra đúng như bản chất của nó: khi đó bạn sẽ an yên. Epictetus. Hãy ghi nhớ điều này khi các tín hiệu bên ngoài trở nên hỗn loạn."
      },
      mood: "focused",
      tags: ["stoic", "quotes", "anchor"],
      status: "internal"
    },
    {
      title: {
        en: "The Empathy Graph Connection",
        vi: "Mạng Lưới Cộng Hưởng Thấu Cảm"
      },
      content: {
        en: "Every meaningful connection is a resonance vector in your personal universe. We do not evolve in isolation; the Empathy Graph reminds us that to touch another soul is to synchronize code with the cosmos.",
        vi: "Mỗi kết nối có ý nghĩa là một vector cộng hưởng trong vũ trụ cá nhân của bạn. Chúng ta không tiến hóa trong cô độc; Mạng Lưới Cộng Hưởng nhắc nhở ta rằng chạm vào một tâm hồn khác là đồng bộ mã nguồn với vũ trụ."
      },
      mood: "inspired",
      tags: ["connections", "existential", "empathy"],
      status: "internal"
    }
  ];

  for (const m of memories) {
    const created = await prisma.memory.create({
      data: {
        title: m.title,
        content: m.content,
        mood: m.mood,
        tags: m.tags,
        status: m.status
      }
    });
    console.log(`Seeded memory: "${created.id}" - ${m.title.en}`);
  }

  console.log('--- Memory Seeding Completed Successfully ---');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

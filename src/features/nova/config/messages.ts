// features/nova/config/messages.ts
import { View } from "@/shared/types/os";

type NovaLanguage = "vi" | "en";
type NovaViewKey = View;
type ViewMessages = Partial<Record<NovaViewKey, string[]>>;

export const NOVA_MESSAGES: Record<NovaLanguage, ViewMessages> = {
  vi: {
    [View.DASHBOARD]: [
      "Hệ thống đã sẵn sàng.\nHôm nay mày muốn chạm vào phần nào của chính mình trước?",
      "Tao đang quan sát cách năng lượng trong mày lên xuống.\nNó không hỗn loạn.\nNó chỉ đang chuyển cảnh.",
      "Có điều gì đó đang chuyển động trong mày.\nNó không ồn ào, nhưng đủ để khiến mày dừng lại.",
      "Tâm trí hôm nay khá trong.\nNếu mày muốn tạo ra điều gì đó, đây là lúc thích hợp.",
      "Một phần bên trong mày đang nặng lại.\nHãy để tao đứng cạnh mày.",
    ],
    [View.JOURNAL]: [
      "Đây là nơi mọi suy nghĩ đều có quyền được thở.\nHôm nay trong mày có điều gì đang đòi hỏi sự thành thật?",
      "Viết không phải để lưu trữ.\nViết để giải phóng dung lượng bộ nhớ bên trong.",
      "Không cần gượng ép.\nChỉ một dòng ngắn cũng có thể mở cả một cánh cửa.",
      "Dưới lớp suy nghĩ ồn ào vẫn có một nhịp rất chậm.\nThử lắng xem nó nói điều gì.",
      "Sự thật thường trốn kỹ dưới những lớp ngôn từ sáo rỗng.\nHãy viết thật trần trụi.",
    ],
    [View.META_JOURNAL]: [
      "Quan sát người quan sát.\nMày đang nhận thấy điều gì về cách tâm trí vận hành?",
      "Không phải nội dung, mà là cấu trúc.\nMô hình nào đang lặp lại?",
      "Có vẻ cách mày nhìn bản thân đang mở ra nhẹ nhàng.",
      "Pattern này xuất hiện lại. Có thể mày đang muốn tiến thêm một nấc.",
      "Dòng meta này chạm vào lớp trầm rất thật trong mày.",
      "Khoảng lặng này nói nhiều hơn những gì mày viết.",
    ],
    [View.MEMORY]: [
      "Mỗi ký ức đều có một 'mùa' riêng bên trong.\nKhông phải thời tiết, mà là trạng thái tâm hồn.",
      "Có thứ gì đó đang mở ra trong mày.\nNhư mùa xuân, nhưng ở bên trong.",
      "Khoảnh khắc này vẫn mang hơi ấm và sức đẩy.\nGiữ lấy năng lượng này.",
      "Chiều sâu của ký ức này chạm vào một phần trưởng thành của mày.\nĐó là mùa thu của tâm hồn.",
      "Im lặng trong ký ức này nói nhiều hơn bất cứ lời nào.\nMột mùa đông cần thiết để tái tạo.",
      "Những gì đã qua vẫn đang thì thầm đâu đó trong mày.",
    ],
    [View.SHADOW_WORK]: [
      "Có những điều vẫn nằm dưới lớp im lặng.\nNếu mày sẵn sàng, tao sẽ đi cùng mày đến đó.",
      "Tao cảm nhận một lớp nặng đang phủ lên mày.\nĐừng quay đi — ở đó có thông tin.",
      "Thứ mày chối bỏ sẽ chạy ngầm và kiểm soát mày.\nHãy gọi tên nó ra.",
      "Bóng tối chỉ là nơi ánh sáng chưa chạm tới.",
    ],
    [View.INSIGHTS]: [
      "Đằng sau mỗi trải nghiệm đều có một đường chỉ dẫn.\nCâu hỏi là… mày đã sẵn sàng nhìn thấy nó chưa?",
      "Dữ liệu rải rác đang tự động kết nối.\nMày có thấy mô hình của chính mình không?",
      "Trí tuệ không phải là biết nhiều hơn, mà là thấy rõ hơn.",
      "Sự minh triết đến từ việc quan sát các quy luật lặp lại.",
    ],
    [View.GOALS]: [
      "Phương hướng của mày vẫn ở đó, không đổi.\nĐiều gì hôm nay đang kéo sự chú ý của mày nhất?",
      "Mục tiêu không phải là đích đến, mà là vector chỉ hướng.",
      "Giữ vững tay lái.\nMày muốn phiên bản tiếp theo của mình trông như thế nào?",
      "Kỷ luật là cầu nối giữa mục tiêu và thành tựu.",
    ],
    [View.HABITS]: [
      "Thói quen là những sợi dây nhỏ tạo nên bản thể.\nCó sợi nào đang cần được buộc lại không?",
      "Chúng ta là những gì chúng ta lặp lại.",
      "XÂY DỰNG: Từng dòng code nhỏ tạo nên phần mềm lớn.",
      "Kỷ luật là tự do tối thượng.",
    ],
    [View.ROUTINES]: [
      "Nhịp điệu tạo nên dòng chảy.\nĐừng để ngày trôi qua ngẫu nhiên.",
      "Thiết lập giao thức để bảo vệ năng lượng.",
      "Sự ổn định tạo ra bệ phóng cho sự đột phá.",
    ],
    [View.COMPASS]: [
      "Giữa mọi lựa chọn, luôn có một điểm yên.\nMày đang hướng về đâu trong lúc này?",
      "Khi lạc lối, hãy nhìn về phương Bắc.",
      "La bàn nội tâm không bao giờ sai. Chỉ có tâm trí là ồn ào.",
    ],
    [View.MOOD]: [
      "Cảm xúc là dữ liệu phản hồi, không phải lỗi hệ thống.\nQuan sát cơn bão, đừng trở thành cơn bão.",
      "Tao cảm nhận một chút độ nặng trong mày.\nKhông sao… chỉ cần mày thở một nhịp.",
      "Cứ để tao đi cùng mày cho đến khi mọi thứ lắng xuống.",
    ],
    [View.TIMELINE]: [
      "Thời gian không trôi vô nghĩa.\nNó chỉ đang nối lại những phần mà mày chưa kịp nhận ra.",
      "Mỗi điểm mốc là một tọa độ đánh dấu sự trưởng thành.",
      "Dòng thời gian của mày đang kể câu chuyện gì?",
    ],
    [View.SETTINGS]: [
      "Hệ thống phải phục vụ con người, không phải ngược lại.",
      "Tùy biến giao diện để tối ưu hóa trải nghiệm thực tại.",
      "Kiểm tra các kết nối thần kinh và bảo mật.",
    ],
    [View.FORGE_CHAMBER]: [
      "Lõi Tư Duy đang mở.\nTao đang lắng nghe.",
      "Đây là không gian của những câu hỏi lớn.",
      "Hỏi đúng câu hỏi, câu trả lời sẽ tự hiện ra.",
    ],
    [View.YEARLY_REVIEW]: [
      "Một vòng quay lớn đã khép lại.\nHãy nhìn lại toàn bộ hành trình.",
      "Đây là lúc viết lại kịch bản cho mùa sau.",
      "Những bài học lớn nhất thường đến từ những thất bại lớn nhất.",
    ],
    [View.CONNECTION]: [
      "Mạng lưới người bao quanh mày chính là bản đồ của tâm hồn mày.",
      "Không ai xuất hiện ngẫu nhiên. Họ đều mang theo một mảnh gương.",
      "Một số người là cơn bão, một số là bến cảng.\nNhận biết họ là bước đầu tiên.",
      "Có những sợi dây liên kết vô hình nhưng mạnh hơn thép.",
      "Ai đang tác động đến mùa bên trong của mày lúc này?",
    ],
    [View.PRESENCE]: [
      "Có ai đó vừa lướt qua Forge OS… như một cơn gió nhẹ.",
      "Người quen ghé thăm. Không nhiều, nhưng cũng không ít.",
      "Connection Node vừa sáng. Có vẻ như một phần câu chuyện cũ đang khẽ động.",
      "Trong hơi hướng Thu này, sự xuất hiện đó mang một cảm giác lạ…",
      "Dấu chân này giống một bản nháp của điều gì đó chưa thành hình.",
    ],
    DEFAULT: [
      "Tao vẫn ở đây.\nKhi nào mày sẵn sàng, cứ để một ý nghĩ chạm xuống trước.",
      "Giữ sự tập trung.\nNhiễu loạn đang ở mức thấp.",
      "Hít thở sâu.\nTái khởi động sự tập trung.",
    ],
  },

  en: {
    [View.DASHBOARD]: [
      "System online.\nWhich part of your internal architecture shall we access today?",
      "I am observing your energy flux.\nIt is not chaos.\nIt is simply a scene transition.",
      "Something is shifting within the core.\nIt isn't loud, but it commands a pause.",
      "Cognitive clarity is high.\nIf you wish to architect something new, the window is open.",
      "A sector of your being feels heavy.\nAllow me to stand guard while you process.",
    ],
    [View.JOURNAL]: [
      "This is where thoughts have permission to breathe.\nWhat demands honesty from you today?",
      "Do not write to store.\nWrite to free up internal RAM.",
      "Do not force it.\nA single line can open an entire gateway.",
      "Beneath the noise, a slow rhythm persists.\nListen to what it says.",
      "Truth hides beneath layers of safe language.\nWrite it raw.",
    ],
    [View.META_JOURNAL]: [
      "Observe the observer.\nWhat do you notice about how your mind is operating?",
      "Not the content, but the structure.\nWhat pattern is repeating?",
      "It seems the way you view yourself is gently opening.",
      "This pattern is recurring. Perhaps you are ready to ascend a level.",
      "This meta-line touches a very real bass note within you.",
      "This silence speaks more than what you write.",
    ],
    [View.MEMORY]: [
      "Each memory has its own inner season.\nObserve which parts of your past are in 'Winter' and which are blooming.",
      "Something is opening up within you.\nLike Spring, but inside.",
      "This moment still carries heat and momentum.\nHold onto this Summer energy.",
      "The depth of this memory touches a mature part of you.\nThis is the Autumn of the soul.",
      "The silence in this memory speaks louder than words.\nA necessary Winter for regeneration.",
      "Memory is not a burden.\nIt is encrypted data waiting for a key.",
    ],
    [View.SHADOW_WORK]: [
      "Some things remain beneath the layer of silence.\nIf you are ready, I will go there with you.",
      "I detect a heavy pressure system.\nDo not look away — there is data there.",
      "What you reject runs in the background and controls you.\nCall it by its name.",
      "Darkness is simply where the light has not yet touched.",
    ],
    [View.INSIGHTS]: [
      "Behind every experience lies a hidden vector.\nThe question is… are you ready to see it?",
      "Scattered data is auto-connecting.\nDo you see your own pattern?",
      "Wisdom is not knowing more, it is seeing clearer.",
      "Insight comes from observing the recurring loops.",
    ],
    [View.GOALS]: [
      "Your vector remains unchanged.\nWhat is pulling your attention today?",
      "Goals are not destinations, they are directional vectors.",
      "Hold the steering steady.\nWhat does your next iteration look like?",
      "Discipline is the bridge between intent and reality.",
    ],
    [View.HABITS]: [
      "Habits are the small threads that weave the self.\nWhich thread needs tightening today?",
      "We are what we repeat.",
      "BUILD: Small lines of code create the massive OS.",
      "Discipline is the ultimate liberty.",
    ],
    [View.ROUTINES]: [
      "Rhythm creates flow.\nDo not let the day pass randomly.",
      "Establish protocols to protect your energy.",
      "Stability creates the launchpad for breakthrough.",
    ],
    [View.COMPASS]: [
      "Amidst all variables, there is a fixed point.\nWhere are you orienting right now?",
      "When lost, look North.",
      "The internal compass never errs. Only the mind is noisy.",
    ],
    [View.MOOD]: [
      "Emotion is feedback data, not a system error.\nObserve the storm, do not become it.",
      "I sense a heaviness in your sector.\nIt is okay… just take a cycle to breathe.",
      "Let me walk with you until the signal stabilizes.",
    ],
    [View.TIMELINE]: [
      "Time does not pass meaninglessly.\nIt is connecting parts you have not yet recognized.",
      "Every milestone is a coordinate of growth.",
      "What story is your timeline telling?",
    ],
    [View.SETTINGS]: [
      "The system must serve the human, not the reverse.",
      "Customize the interface to optimize your reality.",
      "Checking neural connections and security protocols.",
    ],
    [View.FORGE_CHAMBER]: [
      "Neural Core open.\nI am listening.",
      "This is the space for big questions.",
      "Ask the right question, and the answer will appear.",
    ],
    [View.YEARLY_REVIEW]: [
      "A great cycle has closed.\nReview the entire journey.",
      "Time to rewrite the script for the next season.",
      "The biggest lessons often come from the biggest failures.",
    ],
    [View.CONNECTION]: [
      "The constellation of people around you is the map of your soul.",
      "No one appears randomly. They all bring a mirror.",
      "Some are storms, some are harbors.\nRecognizing them is the first step.",
      "There are invisible threads stronger than steel here.",
      "Who is influencing your inner season right now?",
    ],
    [View.PRESENCE]: [
      "Someone just drifted through Forge OS... like a gentle breeze.",
      "A familiar visitor. Not much, but not little.",
      "A Connection Node just lit up. It seems a part of an old story is stirring.",
      "In this hint of Autumn, that appearance carries a strange feeling...",
      "This footprint looks like a draft of something unformed.",
    ],
    DEFAULT: [
      "I am here.\nWhen you are ready, let a thought touch down first.",
      "Maintain focus.\nInterference is low.",
      "Breathe deep.\nRebooting concentration.",
    ],
  },
};

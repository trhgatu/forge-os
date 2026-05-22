export enum PermissionEnum {
  // 🔐 AUTH
  VIEW_ME = 'view_me',
  UPDATE_ME = 'update_me',

  // 👤 USER
  CREATE_USER = 'create_user',
  READ_USER = 'read_user',
  UPDATE_USER = 'update_user',
  DELETE_USER = 'delete_user',

  // 🧱 ROLE
  CREATE_ROLE = 'create_role',
  READ_ROLE = 'read_role',
  UPDATE_ROLE = 'update_role',
  DELETE_ROLE = 'delete_role',

  // 🛡️ PERMISSION
  CREATE_PERMISSION = 'create_permission',
  READ_PERMISSION = 'read_permission',
  UPDATE_PERMISSION = 'update_permission',
  DELETE_PERMISSION = 'delete_permission',

  // 📝 AUDIT LOG
  READ_AUDIT_LOG = 'read_audit_log',
  DELETE_AUDIT_LOG = 'delete_audit_log',

  // 🚀 PROJECT
  CREATE_PROJECT = 'create_project',
  READ_PROJECT = 'read_project',
  UPDATE_PROJECT = 'update_project',
  DELETE_PROJECT = 'delete_project',
  RESTORE_PROJECT = 'restore_project',

  // 📓 JOURNAL
  CREATE_JOURNAL = 'create_journal',
  READ_JOURNAL = 'read_journal',
  UPDATE_JOURNAL = 'update_journal',
  DELETE_JOURNAL = 'delete_journal',
  RESTORE_JOURNAL = 'restore_journal',

  // 🧠 MEMORY
  CREATE_MEMORY = 'create_memory',
  READ_MEMORY = 'read_memory',
  UPDATE_MEMORY = 'update_memory',
  DELETE_MEMORY = 'delete_memory',
  RESTORE_MEMORY = 'restore_memory',

  // 💬 QUOTE
  CREATE_QUOTE = 'create_quote',
  READ_QUOTE = 'read_quote',
  UPDATE_QUOTE = 'update_quote',
  DELETE_QUOTE = 'delete_quote',
  RESTORE_QUOTE = 'restore_quote',

  // 😊 MOOD
  CREATE_MOOD = 'create_mood',
  READ_MOOD = 'read_mood',
  UPDATE_MOOD = 'update_mood',
  DELETE_MOOD = 'delete_mood',
  RESTORE_MOOD = 'restore_mood',

  // 🌐 PRESENCE & TIMELINE
  READ_TIMELINE = 'read_timeline',
  CREATE_PRESENCE = 'create_presence',
  READ_PRESENCE = 'read_presence',
  UPDATE_PRESENCE = 'update_presence',
  DELETE_PRESENCE = 'delete_presence',

  // ⚡ FORGE CHAMBER (AI)
  ACCESS_CHAMBER = 'access_chamber',
  MANAGE_CHAMBER = 'manage_chamber',

  // 🧪 SYSTEM
  ACCESS_TEST_ENDPOINT = 'access_test_endpoint',

  // 🛡️ QUEST
  CREATE_QUEST = 'create_quest',
  READ_QUEST = 'read_quest',
  UPDATE_QUEST = 'update_quest',
  DELETE_QUEST = 'delete_quest',
}

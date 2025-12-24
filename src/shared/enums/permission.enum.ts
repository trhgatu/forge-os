export enum PermissionEnum {
  // 🔐 AUTH
  VIEW_ME = 'view_me',
  UPDATE_ME = 'update_me',

  // 👤 USER
  CREATE_USER = 'create_user',
  READ_USER = 'read_user',
  UPDATE_USER = 'update_user',
  DELETE_USER = 'delete_user',

  // 🏟️ VENUE
  CREATE_VENUE = 'create_venue',
  READ_VENUE = 'read_venue',
  UPDATE_VENUE = 'update_venue',
  DELETE_VENUE = 'delete_venue',
  RESTORE_VENUE = 'restore_venue',

  //COURT
  CREATE_COURT = 'create_court',
  READ_COURT = 'read_court',
  UPDATE_COURT = 'update_court',
  DELETE_COURT = 'delete_court',
  RESTORE_COURT = 'restore_court',

  //SPORT
  CREATE_SPORT = 'create_sport',
  READ_SPORT = 'read_sport',
  UPDATE_SPORT = 'update_sport',
  DELETE_SPORT = 'delete_sport',
  RESTORE_SPORT = 'restore_sport',

  //BOOKING
  CREATE_BOOKING = 'create_booking',
  READ_BOOKING = 'read_booking',
  UPDATE_BOOKING = 'update_booking',
  DELETE_BOOKING = 'delete_booking',
  RESTORE_BOOKING = 'restore_booking',

  // 🧱 ROLE
  CREATE_ROLE = 'create_role',
  READ_ROLE = 'read_role',
  UPDATE_ROLE = 'update_role',
  DELETE_ROLE = 'delete_role',

  CREATE_MEMORY = 'create_memory',
  READ_MEMORY = 'read_memory',
  UPDATE_MEMORY = 'update_memory',
  DELETE_MEMORY = 'delete_memory',
  RESTORE_MEMORY = 'restore_memory',

  CREATE_QUOTE = 'create_quote',
  READ_QUOTE = 'read_quote',
  UPDATE_QUOTE = 'update_quote',
  DELETE_QUOTE = 'delete_quote',
  RESTORE_QUOTE = 'restore_quote',

  CREATE_JOURNAL = 'create_journal',
  READ_JOURNAL = 'read_journal',
  UPDATE_JOURNAL = 'update_journal',
  DELETE_JOURNAL = 'delete_journal',
  RESTORE_JOURNAL = 'restore_journal',

  CREATE_MOOD = 'create_mood',
  READ_MOOD = 'read_mood',
  UPDATE_MOOD = 'update_mood',
  DELETE_MOOD = 'delete_mood',
  RESTORE_MOOD = 'restore_mood',

  // 🛡️ PERMISSION
  CREATE_PERMISSION = 'create_permission',
  READ_PERMISSION = 'read_permission',
  UPDATE_PERMISSION = 'update_permission',
  DELETE_PERMISSION = 'delete_permission',

  // 📝 AUDIT LOG
  READ_AUDIT_LOG = 'read_audit_log',
  DELETE_AUDIT_LOG = 'delete_audit_log', // Audit logs usually read-only or delete-only

  // 🧪 TESTING or DEBUG
  ACCESS_TEST_ENDPOINT = 'access_test_endpoint',
}

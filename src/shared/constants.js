module.exports = Object.freeze({
    PLAYER_RADIUS: 20,
    PLAYER_MAX_HP: 100,
    PLAYER_SPEED: 400,
    PLAYER_FIRE_COOLDOWN: 0.25,
  
    BULLET_RADIUS: 3,
    BULLET_SPEED: 800,
    BULLET_DAMAGE: 10,
  
    SCORE_BULLET_HIT: 20,
    SCORE_PER_SECOND: 1,

    FLOOR_HEIGHT: 100,
    FLOOR_WIDTH: 500,
    FLOOR_OFFSET: 15,

    PLAYER_HEIGHT:  64,
    PLAYER_WIDTH: 64,

    // WEAPON_NAME_ARRAY = ["hammer", "bat", "axe", "mace", "maul"],
  
    MAP_SIZE: 700,
    MSG_TYPES: {
      JOIN_GAME: 'join_game',
      GAME_UPDATE: 'update',
      LEFTSPEED: 'leftspeed',
      ZEROSPEED: 'zerospeed',
      RIGHTSPEED: 'rightspeed',
      DIRECTION: 'direction',
      GAME_OVER: 'dead',
      DISCONNECT: 'disconnect'
    },
  });
  
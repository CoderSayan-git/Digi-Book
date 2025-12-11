const crypto = require('crypto');

// Encryption algorithm - AES-256-GCM (Galois/Counter Mode)
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16; // For AES, this is always 16 bytes
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;
const KEY_LENGTH = 32;

// Get encryption key from environment variable
function getEncryptionKey() {
  const key = process.env.ENCRYPTION_KEY;
  
  if (!key) {
    throw new Error('ENCRYPTION_KEY must be set in environment variables');
  }
  
  // Derive a proper key from the secret using PBKDF2
  return crypto.pbkdf2Sync(key, 'salt', 100000, KEY_LENGTH, 'sha256');
}

/**
 * Encrypt a password string
 * @param {string} text - Plain text password to encrypt
 * @returns {string} - Encrypted password in format: iv:encrypted:authTag
 */
function encrypt(text) {
  try {
    if (!text) return text;

    const key = getEncryptionKey();
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    // Return format: iv:encrypted:authTag (all in hex)
    return `${iv.toString('hex')}:${encrypted}:${authTag.toString('hex')}`;
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt password');
  }
}

/**
 * Decrypt an encrypted password string
 * @param {string} encryptedData - Encrypted password in format: iv:encrypted:authTag
 * @returns {string} - Decrypted plain text password
 */
function decrypt(encryptedData) {
  try {
    if (!encryptedData) return encryptedData;
    
    // Check if data is already in encrypted format
    if (!encryptedData.includes(':')) {
      // Data might be plain text (backward compatibility)
      return encryptedData;
    }
    
    const key = getEncryptionKey();
    const parts = encryptedData.split(':');
    
    if (parts.length !== 3) {
      throw new Error('Invalid encrypted data format');
    }
    
    const iv = Buffer.from(parts[0], 'hex');
    const encrypted = parts[1];
    const authTag = Buffer.from(parts[2], 'hex');
    
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt password');
  }
}

/**
 * Generate a secure random encryption key
 * Use this to generate a key for ENCRYPTION_KEY in .env
 * @returns {string} - Random hex string (64 characters)
 */
function generateEncryptionKey() {
  return crypto.randomBytes(32).toString('hex');
}

module.exports = {
  encrypt,
  decrypt,
  generateEncryptionKey
};

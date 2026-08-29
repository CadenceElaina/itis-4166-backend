// index.js
// This module reads commands from commands.json and executes them sequentially.

import fs from 'fs/promises';
import { join } from 'path';
import {
  resetPosts,
  createPost,
  readPost,
  updatePost,
  deletePost,
  listPosts,
} from './blogService.js';

/**
 * Executes a single blog command object.
 * The command object has an "action" property and optional data (title, content, id).
 * Each case performs any necessary input validation, executes the action, and logs the outcome.
 *
 * @param {object} cmd - The command to process
 *
 * Implement each case based on the descriptions below.
 */
export async function processCommand(cmd) {
  switch (cmd.action) {
    case 'reset': {
      await resetPosts();
      console.log('[RESET] All posts have been cleared');
      break;
    }
    case 'create': {
      if (!cmd.title || !cmd.content) {
        console.log('[ERROR] Title and content are required');
        break;
      }

      const post = await createPost(cmd.title, cmd.content);
      console.log(`[SUCCESS] Created post #${post.id}: '${post.title}'`);
      break;
    }
    case 'read': {
      const post = await readPost(cmd.id);

      if (!post) {
        console.log(`[ERROR] Post #${cmd.id} not found`);
        break;
      }

      console.log(
        `[POST #${post.id} | ${post.views} views] '${post.title}' - ${post.content}`
      );
      break;
    }
    case 'update': {
      if (!cmd.title && !cmd.content) {
        console.log('[ERROR] Must provide title or content to update');
        break;
      }

      const updated = await updatePost(cmd.id, cmd.title, cmd.content);
      console.log(
        updated
          ? `[SUCCESS] Post #${cmd.id} updated`
          : `[ERROR] Post #${cmd.id} not found`
      );
      break;
    }
    case 'delete': {
      const deleted = await deletePost(cmd.id);
      console.log(
        deleted
          ? `[SUCCESS] Post #${cmd.id} deleted`
          : `[ERROR] Post #${cmd.id} not found`
      );
      break;
    }
    case 'list': {
      const posts = await listPosts();
      console.log(`[LIST] Total posts: ${posts.length}`);
      console.log(posts);
      break;
    }
    case 'exit': {
      console.log('[INFO] Exiting program');
      process.exit(0);
    }
    default: {
      console.log(`[ERROR] Unknown action: ${cmd.action}`);
      break;
    }
  }
}

/**
 * ===============================
 * IMPORTANT – DO NOT MODIFY
 * ===============================
 *
 * Runs automatically when executing `node index.js`.
 * Automatically bypassed during testing in gradescope.
 */

if (process.env.NODE_ENV !== 'test') {
  const commandsFilePath = join(process.cwd(), 'commands.json');

  const data = await fs.readFile(commandsFilePath, 'utf-8');
  const commands = JSON.parse(data);

  for (const cmd of commands) {
    await processCommand(cmd);
  }
}

import { Schema as S } from '@triplit/client';

export const schema = S.Collections({
	users: {
		schema: S.Schema({
			id: S.Id(),
			username: S.String(),
			displayName: S.String(),
			avatar: S.String(), // URL to avatar image
			status: S.String({ default: 'online' }),
			lastSeen: S.Date(),
			settings: S.Record({
				audioEnabled: S.Boolean({ default: true }),
				videoEnabled: S.Boolean({ default: true }),
				notificationsEnabled: S.Boolean({ default: true }),
				theme: S.String({ default: 'default' })
			})
		})
	},

	// Rooms - virtual spaces where users gather
	rooms: {
		schema: S.Schema({
			id: S.Id(),
			name: S.String(),
			description: S.String(),
			createdAt: S.Date({ default: () => new Date() }),
			createdBy: S.String(), // user id
			isPublic: S.Boolean({ default: true }),
			maxCapacity: S.Number({ default: 50 }),
			mapData: S.String(), // JSON string of the Phaser tilemap data
			background: S.String(), // Background image or color
			objects: S.Set(S.String()), // References to room_objects
			password: S.String() // Optional password for private rooms
		})
	},

	// User positions - tracks where users are in the virtual space
	positions: {
		schema: S.Schema({
			id: S.Id(),
			userId: S.String(),
			roomId: S.String(),
			x: S.Number(),
			y: S.Number(),
			direction: S.String({ default: 'down' }), // up, down, left, right
			isMoving: S.Boolean({ default: false }),
			updatedAt: S.Date({ default: () => new Date() })
		}),
		indexes: {
			by_room: {
				fields: ['roomId']
			},
			by_user: {
				fields: ['userId']
			}
		}
	},

	// Messages - chat messages in rooms or private chats
	messages: {
		schema: S.Schema({
			id: S.Id(),
			roomId: S.String(),
			senderId: S.String(),
			content: S.String(),
			type: S.String({ default: 'text' }), // text, image, file, etc.
			sentAt: S.Date({ default: () => new Date() }),
			receiverIds: S.Set(S.String()), // empty for room-wide, populated for private messages
			isDeleted: S.Boolean({ default: false })
		}),
		indexes: {
			by_room: {
				fields: ['roomId', 'sentAt']
			},
			by_sender: {
				fields: ['senderId']
			}
		}
	},

	// Room access permissions
	room_permissions: {
		schema: S.Schema({
			id: S.Id(),
			roomId: S.String(),
			userId: S.String(),
			role: S.String({ default: 'participant' }), // owner, moderator, participant
			joinedAt: S.Date({ default: () => new Date() }),
			invitedBy: S.String(),
			canEdit: S.Boolean({ default: false }),
			canInvite: S.Boolean({ default: false }),
			canShare: S.Boolean({ default: true })
		}),
		indexes: {
			by_room_user: {
				fields: ['roomId', 'userId']
			}
		}
	}
});

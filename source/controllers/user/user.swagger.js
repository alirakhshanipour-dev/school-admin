/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              username:
 *                  type: string
 *              phone:
 *                  type: string
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 */


/**
 * @swagger
 * /user/list:
 *   get:
 *     summary: Fetch users with optional filters
 *     tags:
 *       - Users
 *     parameters:
 *       - name: username
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter by username
 *       - name: phone
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter by phone number
 *       - name: email
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter by email
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: fetch user
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User fetched successfully
 *       400:
 *         description: object invalid
 *       500:
 *         description: Internal server error
 */

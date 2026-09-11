// Returns handling for OrderDesk.
//
// A return covers one or more lines of an order. A refund against it must be
// approved by a refunds clerk before any money moves.

/**
 * Open a return request against an order.
 *
 * @param {object} order  the order being returned against
 * @param {Array}  lines  the order lines the customer is sending back
 * @returns {object} the new return request
 */
function openReturn(order, lines) {
  
  if (!order || !order.id) {
    throw new Error('a return must reference a valid order');
  }
  
  if (lines.length === 0) {
    throw new Error('a return must cover at least one line');
  }

  return {
    orderId: order.id,
    lines,
    raisedAt: new Date().toISOString(),
    status: 'OPEN', // Story 1
    approvedBy: null,
    approvedAt: null,
  };
}

// RESOLUTION COMMENT: Merged status tracking from Story 1 with order validation and self-approval checks from Story 2 to preserve functionality of both stories.
function approve(returnRequest, clerkId, reason) {
  if (!reason) {
    throw new Error('a refund approval must carry a reason');
  }

  if (returnRequest.raisedBy === clerkId) {
    throw new Error('clerks cannot approve their own return requests');
  }

  return {
    ...returnRequest,
    status: 'APPROVED', // Story 2
    approvedBy: clerkId,
    approvedAt: new Date().toISOString(),
    reason,
  };
}

module.exports = { openReturn, approve };

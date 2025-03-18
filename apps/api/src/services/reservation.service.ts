import prisma from "../config/db";

export const createReservation = async (data: any) => {
    const {
        clientId,
        serviceId,
        pickupAddress,
        isCurrentLocation,
        latitude,
        longitude,
        whatsappNumber,
        email,
        weightKg,
        dirtinessLevel,
        processingTime,
        selectedItems,
        itemRemarks,
        pickupDate,
        pickupTime,
        paymentMethod,
        additionalNotes,
        // discount,
    } = data;

    // Vérifier si le service existe
    const service = await prisma.service.findUnique({
        where: { id: serviceId },
    });

    if (!service) throw new Error("Service non trouvé");
    // Calcul du prix total avec réduction
    let totalPrice = service.price * weightKg;
    // if (discount) totalPrice -= discount;
    return await prisma.reservation.create({
        data: {
            clientId,
            serviceId,
            pickupAddress,
            isCurrentLocation,
            latitude,
            longitude,
            whatsappNumber,
            email,
            weightKg,
            dirtinessLevel,
            processingTime,
            itemRemarks,
            pickupDate: new Date(pickupDate),
            pickupTime,
            paymentMethod,
            additionalNotes,
            // discount,
            totalPrice,
            deliveryStatus: "NOT_STARTED",
            selectedItems: {
                create: selectedItems.map((item: { itemId: string; quantity: number }) => ({
                    itemId: item.itemId,
                    quantity: item.quantity,
                })),
            },
        },
    })
}
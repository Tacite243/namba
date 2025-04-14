import prisma from "../config/db";


export const findAllReservation = async () => {
    return await prisma.reservation.findMany();
}

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
    if (!serviceId) {
        throw new Error("Le serviceId est requis pour créer une réservation.");
    }
    const service = await prisma.service.findUnique({
        where: { id: serviceId },
    });
    if (!service) {
        throw new Error("Le service avec cet ID n'existe pas.");
    }
    

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
            processingTime,
            pickupDate: new Date(pickupDate),
            pickupTime,
            additionalNotes,
            deliveryStatus: "NOT_STARTED",
        },
    })
}